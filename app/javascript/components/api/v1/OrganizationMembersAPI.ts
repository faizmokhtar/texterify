import { API } from "./API";
import { APIUtils } from "./APIUtils";

const OrganizationMembersAPI = {
  getMembers: async (organizationId: string): Promise<any> => {
    return API.getRequest(`organizations/${organizationId}/members`, true)
      .then(APIUtils.handleErrors).catch(APIUtils.handleErrors);
  },

  createMember: async (organizationId: string, email: string): Promise<any> => {
    return API.postRequest(`organizations/${organizationId}/members`, true, {
      email: email
    }).then(APIUtils.handleErrors).catch(APIUtils.handleErrors);
  },

  deleteMember: async (organizationId: string, userId: string): Promise<any> => {
    return API.deleteRequest(`organizations/${organizationId}/members/${userId}`, true)
      .then(APIUtils.handleErrors).catch(APIUtils.handleErrors);
  }
};

export { OrganizationMembersAPI };
