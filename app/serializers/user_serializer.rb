class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :username, :email

  attribute :role, if: proc { |_, params| params[:project] } do |object, params|
    project_user = ProjectUser.find_by(project_id: params[:project].id, user_id: object.id)
    if project_user
      project_user.role
    else
      OrganizationUser.find_by(organization_id: params[:project].organization_id, user_id: object.id).role
    end
  end

  attribute :role_source, if: proc { |_, params| params[:project] } do |object, params|
    project_user = ProjectUser.find_by(project_id: params[:project].id, user_id: object.id)
    if project_user
      'project'
    else
      'organization'
    end
  end

  attribute :role_organization, if: proc { |_, params| params[:organization] } do |object, params|
    OrganizationUser.find_by(organization_id: params[:organization].id, user_id: object.id).role
  end
end
