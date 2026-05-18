
import prisma from "../config/prisma";

export const getAnalyticsData = async (
  filters: any
) => {
  const {
    departmentId,
    categoryId,
    status,
  } = filters;

  // FILTER
  const where: any = {};

  if (departmentId) {
    where.departmentId = departmentId;
  }

  if (categoryId) {
    where.categoryId = categoryId;
  }

  if (status) {
    where.status = status;
  }

  // TOTAL ASSETS
  const totalAssets =
    await prisma.product.aggregate({
      where,

      _sum: {
        quantity: true,
      },
    });

  // NEW ASSETS
  const newAssets =
    await prisma.product.count({
      where: {
        ...where,

        createdAt: {
          gte: new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            1
          ),
        },
      },
    });

  // EXPIRING SOON
  const expiringSoon =
    await prisma.product.count({
      where: {
        ...where,

        warrantyExpiryDate: {
          lte: new Date(
            Date.now() +
              30 *
                24 *
                60 *
                60 *
                1000
          ),
        },
      },
    });

  // TOTAL VALUE
  const products =
    await prisma.product.findMany({
      where,

      select: {
        quantity: true,
        unitPrice: true,
      },
    });

  const totalValue = products.reduce(
    (sum, item) =>
      sum +
      ((item.unitPrice || 0) *
        (item.quantity || 0)),
    0
  );

  // ASSET INSERTION TREND
  const monthlyTrend =
    await prisma.$queryRaw`
      SELECT 
      TO_CHAR("createdAt", 'Mon YY') as month,
      COUNT(*)::int as count
      FROM "Product"
      GROUP BY month
      ORDER BY MIN("createdAt")
    `;

  // DEPARTMENT WISE DISTRIBUTION
  const departmentWise =
    await prisma.department.findMany({
      select: {
        name: true,

        _count: {
          select: {
            products: true,
          },
        },
      },
    });

  // STATUS OVERVIEW
  const inUse =
    await prisma.product.count({
      where: {
        ...where,
        status: "IN_USE",
      },
    });

  const inStore =
    await prisma.product.count({
      where: {
        ...where,
        status: "IN_STORE",
      },
    });

  const inRepair =
    await prisma.product.count({
      where: {
        ...where,
        status: "IN_REPAIR",
      },
    });

  const retired =
    await prisma.product.count({
      where: {
        ...where,
        status: "RETIRED",
      },
    });

  // AMC ALERTS
  const amcAlerts =
    await prisma.product.findMany({
      where: {
        warrantyExpiryDate: {
          lte: new Date(
            Date.now() +
              30 *
                24 *
                60 *
                60 *
                1000
          ),
        },
      },

      include: {
        vendor: true,
      },

      orderBy: {
        warrantyExpiryDate: "asc",
      },
    });

  return {
    cards: {
      totalAssets:
        totalAssets._sum.quantity || 0,

      newAssets,

      expiringSoon,

      totalValue,
    },

    monthlyTrend,

    departmentWise,

    statusOverview: {
      inUse,
      inStore,
      inRepair,
      retired,
    },

    amcAlerts,
  };
};

