import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";

import { RdsCompAlertPopup, RdsCompDatatable, RdsCompPermissionTree, RdsCompUserBasics } from "../../../rds-components";
import { RdsBadge, RdsButton, RdsInput, RdsNavtabs, RdsOffcanvas } from "../../../rds-elements";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../../libs/state-management/hooks";

import { createUser, deleteUser, fetchEditUser, fetchOrganizationUnits, fetchRoles, fetchUsers, getPermission, updatePermission } from "../../../../libs/state-management/user/user-slice";

const Users = () => {
  const dispatch = useAppDispatch();

  const data = useAppSelector((state) => state.persistedReducer.user);
  const [userId, setUserId] = useState("")
  const [userData, setUserData] = useState<any>({
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
    twoFactorEnabled: false,
    userName: "",
    password:""
  })
  const permissionData = [
    {
      name: "FeatureManagement",
      displayName: "Feature management",
      permissions: [
        {
          name: "FeatureManagement.ManageHostFeatures",
          displayName: "Manage Host features",
          parentName: null,
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
      ],
    },
    {
      name: "AbpIdentity",
      displayName: "Identity management",
      permissions: [
        {
          name: "AbpIdentity.Roles",
          displayName: "Role management",
          parentName: null,
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
        {
          name: "AbpIdentity.Roles.Create",
          displayName: "Create",
          parentName: "AbpIdentity.Roles",
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
        {
          name: "AbpIdentity.Roles.Update",
          displayName: "Edit",
          parentName: "AbpIdentity.Roles",
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
        {
          name: "AbpIdentity.Roles.Delete",
          displayName: "Delete",
          parentName: "AbpIdentity.Roles",
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
        {
          name: "AbpIdentity.Roles.ManagePermissions",
          displayName: "Change permissions",
          parentName: "AbpIdentity.Roles",
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
        {
          name: "AbpIdentity.Users",
          displayName: "User management",
          parentName: null,
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
        {
          name: "AbpIdentity.Users.Create",
          displayName: "Create",
          parentName: "AbpIdentity.Users",
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
        {
          name: "AbpIdentity.Users.Update",
          displayName: "Edit",
          parentName: "AbpIdentity.Users",
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
        {
          name: "AbpIdentity.Users.Delete",
          displayName: "Delete",
          parentName: "AbpIdentity.Users",
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
        {
          name: "AbpIdentity.Users.ManagePermissions",
          displayName: "Change permissions",
          parentName: "AbpIdentity.Users",
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
        {
          name: "AbpIdentity.Users.Impersonation",
          displayName: "Impersonation",
          parentName: "AbpIdentity.Users",
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
        {
          name: "AbpIdentity.Users.Import",
          displayName: "Permission:Import",
          parentName: "AbpIdentity.Users",
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
        {
          name: "AbpIdentity.OrganizationUnits",
          displayName: "Organization Unit Management",
          parentName: null,
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
        {
          name: "AbpIdentity.OrganizationUnits.ManageOU",
          displayName: "Managing organization tree",
          parentName: "AbpIdentity.OrganizationUnits",
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
        {
          name: "AbpIdentity.OrganizationUnits.ManageRoles",
          displayName: "Managing roles",
          parentName: "AbpIdentity.OrganizationUnits",
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
        {
          name: "AbpIdentity.OrganizationUnits.ManageMembers",
          displayName: "Managing users",
          parentName: "AbpIdentity.OrganizationUnits",
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
        {
          name: "AbpIdentity.ClaimTypes",
          displayName: "Claim management",
          parentName: null,
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
        {
          name: "AbpIdentity.ClaimTypes.Create",
          displayName: "Create",
          parentName: "AbpIdentity.ClaimTypes",
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
        {
          name: "AbpIdentity.ClaimTypes.Update",
          displayName: "Edit",
          parentName: "AbpIdentity.ClaimTypes",
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
        {
          name: "AbpIdentity.ClaimTypes.Delete",
          displayName: "Delete",
          parentName: "AbpIdentity.ClaimTypes",
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
        {
          name: "AbpIdentity.SettingManagement",
          displayName: "Setting management",
          parentName: null,
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
        {
          name: "AbpIdentity.SecurityLogs",
          displayName: "Security logs",
          parentName: null,
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
      ],
    },
    {
      name: "SettingManagement",
      displayName: "Setting Management",
      permissions: [
        {
          name: "SettingManagement.Emailing",
          displayName: "Emailing",
          parentName: null,
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
      ],
    },
    {
      name: "Saas",
      displayName: "Saas",
      permissions: [
        {
          name: "Saas.Tenants",
          displayName: "Tenant management",
          parentName: null,
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
        {
          name: "Saas.Tenants.Create",
          displayName: "Create",
          parentName: "Saas.Tenants",
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
        {
          name: "Saas.Tenants.Update",
          displayName: "Edit",
          parentName: "Saas.Tenants",
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
        {
          name: "Saas.Tenants.Delete",
          displayName: "Delete",
          parentName: "Saas.Tenants",
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
        {
          name: "Saas.Tenants.ManageFeatures",
          displayName: "Manage features",
          parentName: "Saas.Tenants",
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
        {
          name: "Saas.Tenants.ManageConnectionStrings",
          displayName: "Manage connection strings",
          parentName: "Saas.Tenants",
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
        {
          name: "Saas.Tenants.Impersonation",
          displayName: "Impersonation",
          parentName: "Saas.Tenants",
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
        {
          name: "Saas.Editions",
          displayName: "Edition management",
          parentName: null,
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
        {
          name: "Saas.Editions.Create",
          displayName: "Create",
          parentName: "Saas.Editions",
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
        {
          name: "Saas.Editions.Update",
          displayName: "Edit",
          parentName: "Saas.Editions",
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
        {
          name: "Saas.Editions.Delete",
          displayName: "Delete",
          parentName: "Saas.Editions",
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
        {
          name: "Saas.Editions.ManageFeatures",
          displayName: "Manage features",
          parentName: "Saas.Editions",
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
      ],
    },
    {
      name: "AuditLogging",
      displayName: "Audit Logging",
      permissions: [
        {
          name: "AuditLogging.AuditLogs",
          displayName: "Audit Logs",
          parentName: null,
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
      ],
    },
    {
      name: "IdentityServer",
      displayName: "Identity Server",
      permissions: [
        {
          name: "IdentityServer.ApiScope",
          displayName: "Api Scopes",
          parentName: null,
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
        {
          name: "IdentityServer.ApiScope.Update",
          displayName: "Edit",
          parentName: "IdentityServer.ApiScope",
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
        {
          name: "IdentityServer.ApiScope.Delete",
          displayName: "Delete",
          parentName: "IdentityServer.ApiScope",
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
        {
          name: "IdentityServer.ApiScope.Create",
          displayName: "Create",
          parentName: "IdentityServer.ApiScope",
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
        {
          name: "AuditLogging.ViewChangeHistory:Volo.Abp.IdentityServer.ApiScopes.ApiScope",
          displayName: "View change history",
          parentName: "IdentityServer.ApiScope",
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
        {
          name: "IdentityServer.IdentityResource",
          displayName: "Identity Resources",
          parentName: null,
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
        {
          name: "IdentityServer.IdentityResource.Update",
          displayName: "Edit",
          parentName: "IdentityServer.IdentityResource",
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
        {
          name: "IdentityServer.IdentityResource.Delete",
          displayName: "Delete",
          parentName: "IdentityServer.IdentityResource",
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
        {
          name: "IdentityServer.IdentityResource.Create",
          displayName: "Create",
          parentName: "IdentityServer.IdentityResource",
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
        {
          name: "IdentityServer.ApiResource",
          displayName: "Api Resources",
          parentName: null,
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
        {
          name: "IdentityServer.ApiResource.Update",
          displayName: "Edit",
          parentName: "IdentityServer.ApiResource",
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
        {
          name: "IdentityServer.ApiResource.Delete",
          displayName: "Delete",
          parentName: "IdentityServer.ApiResource",
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
        {
          name: "IdentityServer.ApiResource.Create",
          displayName: "Create",
          parentName: "IdentityServer.ApiResource",
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
        {
          name: "IdentityServer.Client",
          displayName: "Clients",
          parentName: null,
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
        {
          name: "IdentityServer.Client.Update",
          displayName: "Edit",
          parentName: "IdentityServer.Client",
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
        {
          name: "IdentityServer.Client.Delete",
          displayName: "Delete",
          parentName: "IdentityServer.Client",
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
        {
          name: "IdentityServer.Client.Create",
          displayName: "Create",
          parentName: "IdentityServer.Client",
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
        {
          name: "IdentityServer.Client.ManagePermissions",
          displayName: "Manage Permissions",
          parentName: "IdentityServer.Client",
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
      ],
    },
    {
      name: "AbpAccount",
      displayName: "Account",
      permissions: [
        {
          name: "AbpAccount.SettingManagement",
          displayName: "Setting management",
          parentName: null,
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
      ],
    },
    {
      name: "LanguageManagement",
      displayName: "Language Management",
      permissions: [
        {
          name: "LanguageManagement.LanguageTexts",
          displayName: "Language Texts",
          parentName: null,
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
        {
          name: "LanguageManagement.LanguageTexts.Edit",
          displayName: "Edit Language Texts",
          parentName: "LanguageManagement.LanguageTexts",
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
        {
          name: "LanguageManagement.Languages",
          displayName: "Languages",
          parentName: null,
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
        {
          name: "LanguageManagement.Languages.Create",
          displayName: "Create Language",
          parentName: "LanguageManagement.Languages",
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
        {
          name: "LanguageManagement.Languages.Edit",
          displayName: "Edit Language",
          parentName: "LanguageManagement.Languages",
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
        {
          name: "LanguageManagement.Languages.ChangeDefault",
          displayName: "Change Default Language",
          parentName: "LanguageManagement.Languages",
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
        {
          name: "LanguageManagement.Languages.Delete",
          displayName: "Delete Language",
          parentName: "LanguageManagement.Languages",
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
      ],
    },
    {
      name: "LeptonThemeManagement",
      displayName: "Lepton Theme management",
      permissions: [
        {
          name: "LeptonThemeManagement.Settings",
          displayName: "Lepton Theme settings",
          parentName: null,
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
      ],
    },
    {
      name: "TextTemplateManagement",
      displayName: "Text Template Management",
      permissions: [
        {
          name: "TextTemplateManagement.TextTemplates",
          displayName: "Text Templates",
          parentName: null,
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
        {
          name: "TextTemplateManagement.TextTemplates.EditContents",
          displayName: "Edit Contents",
          parentName: "TextTemplateManagement.TextTemplates",
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
      ],
    },
    {
      name: "BookStore",
      displayName: "BookStore",
      permissions: [
        {
          name: "BookStore.Dashboard.Host",
          displayName: "Dashboard",
          parentName: null,
          isGranted: false,
          allowedProviders: [],
          grantedProviders: [{ providerName: "R", providerKey: "admin" }],
        },
      ],
    },
  ];
  const [userPermission, setUserPermission] = useState<any>(permissionData)
  const [tableData, setTableData] = useState([

    {
      id: 1,
      userName: "tet04",
      name: "test04",
      roles: "Admin, HR",
      emaiAddress: "test04@yopmail.com",
      emailConfirm: { badgeColorVariant: "primary", content: "Yes" },
      status: { badgeColorVariant: "success", content: "Active" },
      creationTime: "01/04/2023, 09:20:51 AM",
    },
  ]);

  
  const tableHeaders = [
    {
      displayName: "User Name",
      key: "userName",
      datatype: "text",
      dataLength: 30,
      required: true,
      sortable: true,
    },
    {
      displayName: "Name",
      key: "name",
      datatype: "text",
      dataLength: 30,
      required: true,
      sortable: true,
    },
    {
      displayName: "Roles",
      key: "roles",
      datatype: "text",
      dataLength: 30,
      required: true,
      sortable: true,
    },
    {
      displayName: "Email Address",
      key: "emaiAddress",
      datatype: "text",
      dataLength: 30,
      required: true,
      sortable: true,
    },
    {
      displayName: "Email Confirm",
      key: "emailConfirm",
      datatype: "badge",
      dataLength: 5,
      required: true,
      sortable: true,
    },
    {
      displayName: "Status",
      key: "status",
      datatype: "badge",
      dataLength: 20,
      required: true,
      sortable: true,
    },
    {
      displayName: "Creation Time",
      key: "creationTime",
      datatype: "text",
      dataLength: 30,
      required: true,
      sortable: true,
    },
  ];

  const actions = [
    { id: "user_edit_offcanvas", displayName: "Edit", offId: "user-edit-off" },
    { id: "user_delete", displayName: "Delete", modalId: "user_delete_off" },
    { id: "set_password", displayName: "Set Password", modalId: "set_password" }
  ];

  const editionList = [
    { option: "Not assigned" },
    { option: "Standard" },
    { option: "apple" },
    { option: "Apple1" },
  ];

  const navtabsItemsEdit = [
    { label: "User Information", tablink: "#nav-home", id: 0 },
    { label: "Permissions", tablink: "#nav-profile", id: 1 }
  ];
  const navtabsItems = [
    { label: "User Information", tablink: "#nav-home", id: 0 },
  ];

  const offCanvasHandler = () => {};
  const [activeNavTabId, setActiveNavTabId] = useState(0);
  const [organizationUnit, setOrganizationUnit] = useState([
    { option: "a", value: "aa" },
    { option: "b", value: "bb" },
    { option: "c", value: "cc" },
    { option: "d", value: "dd" },
  ]);
  const [roles, setRoles] = useState([
    { option: "t", value: "tt" },
    { option: "r", value: "rr" },
    { option: "w", value: "ww" },
    { option: "q", value: "qq" },
  ]);
  const fabMenuListItems: any[] = [
    {
      value: "New User",
      some: "value",
      key: "new",
      icon: "plus",
      iconWidth: "20px",
      iconHeight: "20px",
    },
  ];
  const canvasTitle = "Create New User";
  function onSelectMenu(event: any) {
    console.log(event);
    // if (event.key === 'new') {
    //   event = new PointerEvent("click")
    //   this.newUser(event);
    // }
  }
  const [selectedPermissionListData, setSelectedPermissionListData] = useState<any>([]);

  const [permissionKeyName, setPermissionKeyName] = useState(0)
  function handleSelectesPermission() {
    debugger
      const permissions : any= {
        key : permissionKeyName,
        permissions:{
        permissions : selectedPermissionListData
        }
      }
      dispatch(updatePermission(permissions) as any);
  }

  function SelectesPermissions(permissionsData: any) {
    setSelectedPermissionListData(permissionsData)
  }

  const onActionSelection = (rowData: any, actionId: any) => {
    setPermissionKeyName(rowData.id)
    setUserId(rowData.id);
    dispatch(fetchEditUser(String(rowData.id)) as any)
    var tableId = String(rowData.id);
    dispatch(getPermission(tableId) as any);

  };

  function getSelectedPermissions(data: any) {
    console.log("Granted Permissions", data);
  }
  function getSelectedNavTab(event: any) {
    console.log(event);
  }

  // const exportToExcel = () => {
  //   // create an empty excel workbook
  //   const wb = XLSX.utils.book_new();

  //   // create the headers and data arrays
  //   const headers = tableHeaders.map(header => header.displayName);
  //   const data = tableData.map(row => {
  //     let dataRow = {}
  //     tableHeaders.forEach(header => {
  //       dataRow[header.displayName] = row[header.key]
  //     })
  //     return dataRow
  //   });

  //   // create a worksheet and add the headers and data
  //   const ws = XLSX.utils.json_to_sheet([headers, ...data]);

  //   // add the worksheet to the workbook
  //   XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  //   // write the workbook to a file
  //   XLSX.writeFile(wb, "data.xlsx")
  // }

  const exportToExcel = () => {
    // create an empty excel workbook
    const wb = XLSX.utils.book_new();

    // create the headers and data arrays
    const headers = tableHeaders.map((header) => header.displayName);
    type DataRow = { [key: string]: any };
    const data = tableData.map((row: any) => {
      let dataRow: DataRow = {};
      tableHeaders.forEach((header) => {
        dataRow[header.displayName] = row[header.key];
      });
      return dataRow;
    });

    // create a worksheet and add the headers and data
    const ws = XLSX.utils.json_to_sheet([headers, ...data]);

    // add the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // write the workbook to a file
    XLSX.writeFile(wb, "data.xlsx");
  };

  function newUser(e: any) {
    console.log(e);
  }

  function createNewUser(data:any){
    debugger
    dispatch(createUser(data) as any).then((res:any)=>{
      dispatch(fetchUsers() as any);
    })
    setActiveNavTabId(0)
    setUserData({
      name: "",
      surname: "",
      email: "",
      phoneNumber: "",
      twoFactorEnabled: false,
      userName: "",
      password:""
    })
  }
  useEffect(() => {
    dispatch(fetchUsers() as any);
    dispatch(fetchOrganizationUnits() as any)
    dispatch(fetchRoles() as any)
    //dispatch(fetchEditUser("d58fa786-41a6-b110-d3e4-3a0922833270") as any)

  }, [dispatch]);

  function deleteHandler(data:any){
    console.log(data);
    dispatch(deleteUser(userId) as any).then((result:any)=>{
      dispatch(fetchUsers() as any)
    })
  }

  function handlerSelectedPermission(data:any){
    console.log(data);
  }



  useEffect(() => {
    if (data.users) {
      let tempTableData: any[] = [];
      data.users.items.map((item: any) => {
        const data = {
          id: item.id,
          userName: item.userName,
          name: item.name,
          roles: item.roleNames,
          emaiAddress: item.email,
          emailConfirm: { badgeColorVariant: "primary", content: "Yes" },
          status: { badgeColorVariant: "success", content: "Active" },
          creationTime: "01/04/2023, 09:20:51 AM",
        };
        tempTableData.push(data);
      });
      setTableData(tempTableData);
    }
  }, [data.users]);


  useEffect(()=>{
    if(data.organizationUnit){
      debugger
      console.log(data.organizationUnit)
      let tempOrgData : any[] = [];
      data.organizationUnit.items.map((item:any) =>{
        const data = {
          option:item.displayName,
          value:item.id
        }
        tempOrgData.push(data);
      })
      setOrganizationUnit(tempOrgData);
    }
  },[data.organizationUnit])

  useEffect(()=>{
    if(data.roles){
      debugger
      console.log(data.roles)
      let tempRoleData : any[] = [];
      data.roles.items.map((item:any) =>{
        const data = {
          option:item.name,
          value:item.id
        }
        tempRoleData.push(data);
      })
      setRoles(tempRoleData);
    }
  },[data.roles])

  useEffect(()=>{
    if(data.editUser){
      debugger
      setUserData(data.editUser);
    }
  },[data.editUser])

  return (
    <>
      <div className="row">
        <div className="col-md-12 text-end pb-3 desktop-btn">
          <RdsButton
            label="New User"
            type="button"
            size="medium"
            colorVariant="primary"
            showLoadingSpinner={false}
            databstoggle="offcanvas"
            databstarget="#userOffcanvas"
            icon={"plus"}
            iconWidth={"12px"}
            iconHeight={"12px"}
          ></RdsButton>
        </div>
        <div className="card p-2 h-100 border-0 rounded-0 card-full-stretch">
          <RdsCompDatatable
            tableData={tableData}
            tableHeaders={tableHeaders}
            actions={actions}
            noDataTitle={"Currently you do not have user"}
            classes="table__userTable"
            pagination={true}
            onActionSelection={onActionSelection}
            recordsPerPageSelectListOption={true}
          ></RdsCompDatatable>
          <RdsCompAlertPopup
          alertID="user_delete_off"
          onSuccess={deleteHandler}
        />
        </div>
      </div>
      
      <RdsOffcanvas
        backDrop={false}
        scrolling={true}
        preventEscapeKey={false}
        canvasTitle={canvasTitle}
        offId="userOffcanvas"
        offcanvaswidth={650}
        placement={"end"}
        onClose={(e) => {
          close();
        }}
      >
        <RdsNavtabs
          navtabsItems={navtabsItems}
          type={"tabs"}
          activeNavTabId={activeNavTabId}
          activeNavtabOrder={(activeNavTabId) => {
            setActiveNavTabId(activeNavTabId);
          }}
          justified={false}
        >
          {activeNavTabId == 0 && (
            <RdsCompUserBasics
              organizationUnit={organizationUnit}
              roles={roles}
              userData={userData}
              createUser={(e:any)=>{createNewUser(e)}}
            />
          )}
        </RdsNavtabs>
      </RdsOffcanvas>

      <RdsOffcanvas
          canvasTitle="Edit User"
          onclick={offCanvasHandler}
          placement="end"
          offId="user-edit-off"
          offcanvaswidth={830}
          backDrop={false}
          scrolling={false}
          preventEscapeKey={false}
        >
          <RdsNavtabs
          navtabsItems={navtabsItemsEdit}
          type={"tabs"}
          activeNavTabId={activeNavTabId}
          activeNavtabOrder={(activeNavTabId) => {
            setActiveNavTabId(activeNavTabId);
          }}
          justified={false}
        >
          {activeNavTabId == 0 && (
            <RdsCompUserBasics
              organizationUnit={organizationUnit}
              roles={roles}
              userData={userData}
              isEdit={true}
              createUser={(e:any)=>{createNewUser(e)}}
            />
          )}
          {activeNavTabId == 1 && (
              <>
              <RdsCompPermissionTree permissions={userPermission} selectedPermissions={(SelectesPermission: any) => { SelectesPermissions(SelectesPermission) }}></RdsCompPermissionTree>
              <div className="footer-buttons my-2">
                <div className="row">
                  <div className="col-md-12 d-flex">
                    <div>
                      <RdsButton
                        label="Cancel"
                        type="button"
                        colorVariant="primary"
                        size="small"
                        databsdismiss="offcanvas"
                        isOutline={true}
                      ></RdsButton>
                    </div>
                    <div>
                      <RdsButton
                        label="Save"
                        type="button"
                        size="small"
                        // isDisabled={formValid}
                        class="ms-2"
                        colorVariant="primary"
                        databsdismiss="offcanvas"
                        onClick={handleSelectesPermission}
                      ></RdsButton>
                    </div>
                  </div>
                </div>
              </div>
            </>
            )}

          </RdsNavtabs>



          {/* <div className="d-flex">
            <RdsButton
              label="CANCEL"
              databsdismiss="offcanvas"
              type={"button"}
              size="small"
              isOutline={true}
              colorVariant="primary"
              class="me-2"
            ></RdsButton>
            <RdsButton
              label="SAVE"
              type={"button"}
              size="small"
              databsdismiss="offcanvas"
              isDisabled={val === ""}
              colorVariant="primary"
              class="me-2"
              onClick={editDataHandler}
            ></RdsButton> */}
        </RdsOffcanvas>
    </>
  );
};

export default Users;
