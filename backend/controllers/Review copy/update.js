import { CustomError } from "../../util/error.js"
import Review from "../../models/review.js"

export default async (req, res, next) => {
  const clientId = req.userId
  const reviewId = req.params.reviewId
  const { rating, description } = req.body
  const review = { rating, description }

  try {
    if (!rating) throw new Error("No rating provided")
    if (!reviewId) throw new Error("No reviewId provided")

    const count = await Review.update(reviewId, clientId, review)
    if (count === 0) throw new CustomError(404, "review or client does not exist")

    return res.status(200).json({ message: "review edited successfully!" })
  } catch (error) {
    next(error)
  }
}
