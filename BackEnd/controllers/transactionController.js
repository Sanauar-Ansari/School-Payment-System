import OrderStatus from "../models/OrderStatus.js"

export const webhook = async (req, res) => {
  try {
    const data = req.body.order_info;
    // Update or insert OrderStatus record
    await OrderStatus.findOneAndUpdate(
      { collect_id: data.order_id },
      {
        order_amount: data.order_amount,
        transaction_amount: data.transaction_amount,
        payment_mode: data.payment_mode,
        payment_details: data.payemnt_details,
        bank_reference: data.bank_reference,
        payment_message: data.Payment_message,
        status: data.status,
        error_message: data.error_message,
        payment_time: data.payment_time
      },
      { upsert: true }
    );
    // console.log("Webhook received:", data);

    res.json({ success: true, message: "Webhook processed" });
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};




// this is to get transaction depend on per page.
export const getTransactions = async (req, res) => {
  try {
    //  Get page & limit from query params
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    // Count total transactions
    const totalRecords = await OrderStatus.countDocuments();

    const transactions = await OrderStatus.aggregate([
      { $lookup: { from: "orders", localField: "collect_id", foreignField: "_id", as: "order_details" } },
      { $unwind: "$order_details" },
      { $skip: (page - 1) * limit },
      { $limit: limit }
    ]);

    res.json({
      transactions,
      totalPages: Math.ceil(totalRecords / limit),
      totalRecords,
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


// transaction list depends on school_id
export const getTransactionsBySchool = async (req, res) => {
  try {
    const { schoolId } = req.params;

    // MongoDB aggregation pipeline: join Order + OrderStatus(Took help of chat GPT)
    const transactions = await OrderStatus.aggregate([
      {
        $lookup: {
          from: "orders",
          localField: "collect_id",
          foreignField: "_id",
          as: "order_details",
        },
      },
      { $unwind: "$order_details" },
      {
        $match: {
          "order_details.school_id": schoolId,
        },
      },
      {
        $project: {
          collect_id: 1,
          order_amount: 1,
          transaction_amount: 1,
          status: 1,
          payment_time: 1,
          "order_details.school_id": 1,
          "order_details.gateway_name": 1,
        },
      },
    ]);

    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
// transaction list depends on order_id
export const getTransactionStatus = async (req, res) => {
  try {
    const { customOrderId } = req.params;

    const transaction = await OrderStatus.findOne({ collect_id: customOrderId });

    if (!transaction) {
      return res.status(404).json({ success: false, message: "Transaction not found" });
    }

    res.json({
      success: true,
      status: transaction.status,
      order_amount: transaction.order_amount,
      transaction_amount: transaction.transaction_amount,
      payment_mode: transaction.payment_mode,
      payment_time: transaction.payment_time
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
