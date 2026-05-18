import prisma from "../config/prisma";

export const getDashboardAnalytics = async () => {

  // =========================
  // CATEGORY COUNTS
  // =========================

  const products = await prisma.product.findMany({
    include: {
      category: true,
    },
  });

  const categoryMap: any = {};

  products.forEach((product) => {

    const categoryName =
      product.category?.name || "Others";

    if (!categoryMap[categoryName]) {
      categoryMap[categoryName] = 0;
    }

    categoryMap[categoryName] += product.quantity;
  });

  const categories = Object.entries(categoryMap).map(
    ([name, count]) => ({
      name,
      count,
    })
  );



  // =========================
  // TOTAL ITEMS PROCURED
  // =========================

  const totalItemsProcured = products.reduce(
    (sum, product) => sum + product.quantity,
    0
  );



  // =========================
  // WARRANTY ENDING SOON
  // =========================

  const today = new Date();

  const next30Days = new Date();

  next30Days.setDate(today.getDate() + 30);

  const warrantyEndingSoon = products.filter(
    (product) =>
      product.warrantyExpiryDate &&
      product.warrantyExpiryDate <= next30Days
  ).length;



  // =========================
  // PENDING COMPLAINTS
  // =========================

  const pendingComplaints =
    await prisma.complaint.count({
      where: {
        status: {
          not: "RESOLVED",
        },
      },
    });



  // =========================
  // PENDING AMC RENEWALS
  // =========================

  const pendingAmcRenewals = products.filter(
    (product) =>
      product.amcAvailable &&
      product.warrantyExpiryDate &&
      product.warrantyExpiryDate <= next30Days
  ).length;



  // =========================
  // YEARLY PROCUREMENT GRAPH
  // =========================

  const monthMap: any = {
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0,
  };

  products.forEach((product) => {

    const month = product.procurementDate
      .toLocaleString("default", {
        month: "short",
      });

    monthMap[month] += product.quantity;
  });

  const yearlyProcurement = Object.entries(monthMap).map(
    ([month, count]) => ({
      month,
      count,
    })
  );



  // =========================
  // RECENT COMPLAINTS
  // =========================

  const recentComplaints =
    await prisma.complaint.findMany({
      take: 5,

      orderBy: {
        createdAt: "desc",
      },

      select: {
        id: true,
        title: true,
        urgency: true,
        createdAt: true,
        fullName: true,
      },
    });



  return {
    categories,

    overview: {
      totalItemsProcured,
      warrantyEndingSoon,
      pendingComplaints,
      pendingAmcRenewals,
    },

    yearlyProcurement,

    recentComplaints,
  };
};


export const getReportsSummary = async (query: any) => {

  const {
    department,
    category,
    year,
  } = query;



  // =========================
  // FILTERS
  // =========================

  const whereClause: any = {};



  // department filter
  if (department && department !== "All") {
    whereClause.department = {
      name: department,
    };
  }



  // category filter
  if (category && category !== "All") {
    whereClause.category = {
      name: category,
    };
  }



  // year filter
  if (year) {

    const startDate = new Date(`${year}-01-01`);

    const endDate = new Date(`${year}-12-31`);

    whereClause.procurementDate = {
      gte: startDate,
      lte: endDate,
    };
  }



  // =========================
  // FETCH PRODUCTS
  // =========================

  const products = await prisma.product.findMany({
    where: whereClause,

    include: {
      category: true,
      department: true,
      vendor: true,
    },
  });



  // =========================
  // CATEGORY SUMMARY
  // =========================

  const categoryMap: any = {};

  products.forEach((product) => {

    const categoryName =
      product.category?.name || "Others";

    if (!categoryMap[categoryName]) {
      categoryMap[categoryName] = 0;
    }

    categoryMap[categoryName] += product.quantity;
  });

  const categorySummary =
    Object.entries(categoryMap).map(
      ([name, count]) => ({
        name,
        count,
      })
    );



  // =========================
  // TOTAL ITEMS
  // =========================

  const totalItems = products.reduce(
    (sum, product) => sum + product.quantity,
    0
  );



  // =========================
  // STOCK VALUE
  // =========================

  const stockValue = products.reduce(
    (sum, product) =>
      sum + (product.quantity * product.unitPrice),
    0
  );



  // =========================
  // ACTIVE STOCK %
  // =========================

  const activeStockCount = products
    .filter((product) => product.status === "IN_USE")
    .reduce((sum, product) => sum + product.quantity, 0);

  const activeStock =
    totalItems > 0
      ? Number(
          ((activeStockCount / totalItems) * 100)
            .toFixed(1)
        )
      : 0;



  // =========================
  // DEFECTIVE STOCK %
  // =========================

  const defectiveCount = products
    .filter((product) => product.status === "DAMAGED")
    .reduce((sum, product) => sum + product.quantity, 0);

  const defectiveStock =
    totalItems > 0
      ? Number(
          ((defectiveCount / totalItems) * 100)
            .toFixed(1)
        )
      : 0;



  // =========================
  // UTILIZATION %
  // =========================

  const utilization = activeStock;



  // =========================
  // TOTAL VENDORS
  // =========================

  const uniqueVendorIds = new Set(
    products.map((product) => product.vendorId)
  );

  const totalVendors = uniqueVendorIds.size;



  // =========================
  // COMPLAINTS COUNT
  // =========================

  const complaintsRaised =
    await prisma.complaint.count();



  // =========================
  // WARRANTY ENDING SOON
  // =========================

  const today = new Date();

  const next30Days = new Date();

  next30Days.setDate(today.getDate() + 30);

  const warrantyEndingSoon = products.filter(
    (product) =>
      product.warrantyExpiryDate &&
      product.warrantyExpiryDate <= next30Days
  ).length;



  // =========================
  // MONTHLY STOCK VALUE CHART
  // =========================

  const monthMap: any = {
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0,
  };

  products.forEach((product) => {

    const month =
      product.procurementDate.toLocaleString(
        "default",
        {
          month: "short",
        }
      );

    monthMap[month] +=
      product.quantity * product.unitPrice;
  });

  const stockValueChart =
    Object.entries(monthMap).map(
      ([month, value]) => ({
        month,
        value,
      })
    );



  return {

    categorySummary,

    overview: {
      stockValue,
      totalItems,
      activeStock,
      defectiveStock,
      utilization,
      totalVendors,
      complaintsRaised,
      warrantyEndingSoon,
    },

    stockValueChart,
  };
};