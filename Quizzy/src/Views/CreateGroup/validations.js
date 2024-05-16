import toast from "react-hot-toast";

/**
 * Validates the group object.
 * @param {Object} group - The group object to be validated.
 * @param {string} group.title - The title of the group.
 * @param {string} group.description - The description of the group.
 * @param {Array} group.invitedUsers - The array of invited users.
 * @returns {boolean} - Returns true if the group is invalid, otherwise false.
 */
export const validateGroup = (group) => {
    if (group.title.length < 3 || group.title.length > 30) {
        toast.error("The group title must be between 3 and 30 characters!");
        return true;
    }

    if (group.description.length < 3 || group.description.length > 100) {
        toast.error("The group description must be between 3 and 100 characters!");
        return true;
    }

    if (group.invitedUsers.length === 0) {
        toast.error("You must invite at least one user!");
        return true;
    }

    return false;
}