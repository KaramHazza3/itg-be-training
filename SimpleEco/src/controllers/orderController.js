import * as orderService from "../services/orderService.js";
import asyncHandler from "../utils/asyncHandler.js";
import HTTP_STATUS from "../utils/httpStatus.js";

export const checkoutController = asyncHandler(async (req, res) => {
    const userId = req.user.userId;
    await orderService.checkout(userId);
    return res.json(HTTP_STATUS.CREATED).json({
        message: "Checkout is completed successfully"
    })
});