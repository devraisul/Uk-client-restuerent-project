import AddReviewTag from "./AddReviewTag";
import { AdminReviewContext } from "./context/AdminReviewContex";

export default function AddReviewTagContainer() {
    return (
        <AdminReviewContext>
            <AddReviewTag />
        </AdminReviewContext>
    )
}
