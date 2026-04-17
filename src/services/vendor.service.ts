import prisma from "../lib/prisma";

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

export const updateProfile = async (userId: string, updateData: any) => {
  return await prisma.vendorProfile.update({
    where: { userId },
    data: updateData,
  });
};

export const createCertification = async (vendorId: string, certData: any) => {
  return await prisma.sustainabilityCert.create({
    data: {
      vendorId,
      certifyingAgency: certData.certifyingAgency,
      certificationDate: new Date(certData.certificationDate || Date.now()),
    },
  });
};

export const getCertifications = async (vendorId: string) => {
  return await prisma.sustainabilityCert.findMany({
    where: { vendorId },
  });
};

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
