import toast from "react-hot-toast";

export const validateGroup = (group) => {
    if (group.title.length < 3 || group.title.length > 30) {
        toast.error("The quiz title must be between 3 and 30 characters!");
        return true;
    }

    if (group.description.length < 3 || group.description.length > 100) {
        toast.error("The quiz description must be between 3 and 100 characters!");
        return true;
    }

    if (group.invitedUsers.length === 0) {
        toast.error("You must invite at least one user!");
        return true;
    }

    return false;
}