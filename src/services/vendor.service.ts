import prisma from "../lib/prisma";

/**
 * Retrieves the vendor profile for a specific user.
 * @param userId - ID of the user.
 */
export const getProfile = async (userId: string) => {
  return await prisma.vendorProfile.findUnique({
    where: { userId },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          status: true,
        },
      },
      certifications: true,
    },
  });
};

/**
 * Updates the vendor profile details (e.g., farm name, location).
 * @param userId - ID of the user owning the profile.
 * @param updateData - Object containing fields to update.
 */
export const updateProfile = async (userId: string, updateData: any) => {
  return await prisma.vendorProfile.update({
    where: { userId },
    data: updateData,
  });
};

/**
 * Creates a new sustainability certification application for a vendor.
 * @param vendorId - ID of the vendor profile.
 * @param certData - Object containing agency and date information.
 */
export const createCertification = async (vendorId: string, certData: any) => {
  return await prisma.sustainabilityCert.create({
    data: {
      vendorId,
      certifyingAgency: certData.certifyingAgency,
      certificationDate: new Date(certData.certificationDate || Date.now()),
    },
  });
};

/**
 * Retrieves all certification records for a specific vendor.
 * @param vendorId - ID of the vendor profile.
 */
export const getCertifications = async (vendorId: string) => {
  return await prisma.sustainabilityCert.findMany({
    where: { vendorId },
  });
};

/**
 * Approves or rejects a certification record (Admin action).
 * Updates the overall vendor profile certification status if approved.
 * @param certId - ID of the certification record.
 * @param status - Target status (APPROVED | REJECTED).
 */
export const approveCertification = async (certId: string, status: "APPROVED" | "REJECTED") => {
  const cert = await prisma.sustainabilityCert.findUnique({
    where: { id: certId },
  });

  if (!cert) {
    throw new Error("Certification not found");
  }

  // Update vendor profile certification status if approved
  if (status === "APPROVED") {
    await prisma.vendorProfile.update({
      where: { id: cert.vendorId },
      data: { certificationStatus: "APPROVED" },
    });
  }

  return cert;
};
