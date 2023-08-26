/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUserDetail = /* GraphQL */ `
  subscription OnCreateUserDetail(
    $filter: ModelSubscriptionUserDetailFilterInput
  ) {
    onCreateUserDetail(filter: $filter) {
      id
      QId
      fisrtname
      lastname
      phone
      email
      employee
      dataconfirm
      companyname
      state
      address
      note {
        id
        username
        projectname
        firstname
        lastname
        industry
        price
        templateprice
        file
        preference
        companyname
        templateId
        category
        moredetail
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUserDetail = /* GraphQL */ `
  subscription OnUpdateUserDetail(
    $filter: ModelSubscriptionUserDetailFilterInput
  ) {
    onUpdateUserDetail(filter: $filter) {
      id
      QId
      fisrtname
      lastname
      phone
      email
      employee
      dataconfirm
      companyname
      state
      address
      note {
        id
        username
        projectname
        firstname
        lastname
        industry
        price
        templateprice
        file
        preference
        companyname
        templateId
        category
        moredetail
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUserDetail = /* GraphQL */ `
  subscription OnDeleteUserDetail(
    $filter: ModelSubscriptionUserDetailFilterInput
  ) {
    onDeleteUserDetail(filter: $filter) {
      id
      QId
      fisrtname
      lastname
      phone
      email
      employee
      dataconfirm
      companyname
      state
      address
      note {
        id
        username
        projectname
        firstname
        lastname
        industry
        price
        templateprice
        file
        preference
        companyname
        templateId
        category
        moredetail
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCreatorDetail = /* GraphQL */ `
  subscription OnCreateCreatorDetail(
    $filter: ModelSubscriptionCreatorDetailFilterInput
  ) {
    onCreateCreatorDetail(filter: $filter) {
      id
      QId
      fisrtname
      lastname
      phone
      email
      linkedin
      resume
      function
      whatsapp
      image
      pending
      sector
      experience
      howLong
      totalprofessional
      samples
      demo1
      demo2
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCreatorDetail = /* GraphQL */ `
  subscription OnUpdateCreatorDetail(
    $filter: ModelSubscriptionCreatorDetailFilterInput
  ) {
    onUpdateCreatorDetail(filter: $filter) {
      id
      QId
      fisrtname
      lastname
      phone
      email
      linkedin
      resume
      function
      whatsapp
      image
      pending
      sector
      experience
      howLong
      totalprofessional
      samples
      demo1
      demo2
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCreatorDetail = /* GraphQL */ `
  subscription OnDeleteCreatorDetail(
    $filter: ModelSubscriptionCreatorDetailFilterInput
  ) {
    onDeleteCreatorDetail(filter: $filter) {
      id
      QId
      fisrtname
      lastname
      phone
      email
      linkedin
      resume
      function
      whatsapp
      image
      pending
      sector
      experience
      howLong
      totalprofessional
      samples
      demo1
      demo2
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCreatorApproved = /* GraphQL */ `
  subscription OnCreateCreatorApproved(
    $filter: ModelSubscriptionCreatorApprovedFilterInput
  ) {
    onCreateCreatorApproved(filter: $filter) {
      id
      QId
      fisrtname
      lastname
      phone
      email
      linkedin
      resume
      function
      whatsapp
      image
      sector
      experience
      howLong
      totalprofessional
      samples
      demo1
      demo2
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCreatorApproved = /* GraphQL */ `
  subscription OnUpdateCreatorApproved(
    $filter: ModelSubscriptionCreatorApprovedFilterInput
  ) {
    onUpdateCreatorApproved(filter: $filter) {
      id
      QId
      fisrtname
      lastname
      phone
      email
      linkedin
      resume
      function
      whatsapp
      image
      sector
      experience
      howLong
      totalprofessional
      samples
      demo1
      demo2
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCreatorApproved = /* GraphQL */ `
  subscription OnDeleteCreatorApproved(
    $filter: ModelSubscriptionCreatorApprovedFilterInput
  ) {
    onDeleteCreatorApproved(filter: $filter) {
      id
      QId
      fisrtname
      lastname
      phone
      email
      linkedin
      resume
      function
      whatsapp
      image
      sector
      experience
      howLong
      totalprofessional
      samples
      demo1
      demo2
      createdAt
      updatedAt
    }
  }
`;
export const onCreateNote = /* GraphQL */ `
  subscription OnCreateNote($filter: ModelSubscriptionNoteFilterInput) {
    onCreateNote(filter: $filter) {
      id
      username
      projectname
      firstname
      lastname
      industry
      price
      templateprice
      file
      preference
      companyname
      templateId
      category
      moredetail
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateNote = /* GraphQL */ `
  subscription OnUpdateNote($filter: ModelSubscriptionNoteFilterInput) {
    onUpdateNote(filter: $filter) {
      id
      username
      projectname
      firstname
      lastname
      industry
      price
      templateprice
      file
      preference
      companyname
      templateId
      category
      moredetail
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteNote = /* GraphQL */ `
  subscription OnDeleteNote($filter: ModelSubscriptionNoteFilterInput) {
    onDeleteNote(filter: $filter) {
      id
      username
      projectname
      firstname
      lastname
      industry
      price
      templateprice
      file
      preference
      companyname
      templateId
      category
      moredetail
      createdAt
      updatedAt
    }
  }
`;
export const onCreateOrders = /* GraphQL */ `
  subscription OnCreateOrders($filter: ModelSubscriptionOrdersFilterInput) {
    onCreateOrders(filter: $filter) {
      id
      ordername
      customername
      projectname
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateOrders = /* GraphQL */ `
  subscription OnUpdateOrders($filter: ModelSubscriptionOrdersFilterInput) {
    onUpdateOrders(filter: $filter) {
      id
      ordername
      customername
      projectname
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteOrders = /* GraphQL */ `
  subscription OnDeleteOrders($filter: ModelSubscriptionOrdersFilterInput) {
    onDeleteOrders(filter: $filter) {
      id
      ordername
      customername
      projectname
      createdAt
      updatedAt
    }
  }
`;
export const onCreateOrderConfirmed = /* GraphQL */ `
  subscription OnCreateOrderConfirmed(
    $filter: ModelSubscriptionOrderConfirmedFilterInput
  ) {
    onCreateOrderConfirmed(filter: $filter) {
      id
      username
      projectname
      industry
      preference
      companyname
      creator
      payment
      amount
      category
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateOrderConfirmed = /* GraphQL */ `
  subscription OnUpdateOrderConfirmed(
    $filter: ModelSubscriptionOrderConfirmedFilterInput
  ) {
    onUpdateOrderConfirmed(filter: $filter) {
      id
      username
      projectname
      industry
      preference
      companyname
      creator
      payment
      amount
      category
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteOrderConfirmed = /* GraphQL */ `
  subscription OnDeleteOrderConfirmed(
    $filter: ModelSubscriptionOrderConfirmedFilterInput
  ) {
    onDeleteOrderConfirmed(filter: $filter) {
      id
      username
      projectname
      industry
      preference
      companyname
      creator
      payment
      amount
      category
      createdAt
      updatedAt
    }
  }
`;
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage($filter: ModelSubscriptionMessageFilterInput) {
    onCreateMessage(filter: $filter) {
      id
      channelID
      displayname
      author
      body
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage($filter: ModelSubscriptionMessageFilterInput) {
    onUpdateMessage(filter: $filter) {
      id
      channelID
      displayname
      author
      body
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage($filter: ModelSubscriptionMessageFilterInput) {
    onDeleteMessage(filter: $filter) {
      id
      channelID
      displayname
      author
      body
      createdAt
      updatedAt
    }
  }
`;
export const onCreateNotification = /* GraphQL */ `
  subscription OnCreateNotification(
    $filter: ModelSubscriptionNotificationFilterInput
  ) {
    onCreateNotification(filter: $filter) {
      id
      QId
      messagetype
      message
      cId
      pId
      projectname
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateNotification = /* GraphQL */ `
  subscription OnUpdateNotification(
    $filter: ModelSubscriptionNotificationFilterInput
  ) {
    onUpdateNotification(filter: $filter) {
      id
      QId
      messagetype
      message
      cId
      pId
      projectname
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteNotification = /* GraphQL */ `
  subscription OnDeleteNotification(
    $filter: ModelSubscriptionNotificationFilterInput
  ) {
    onDeleteNotification(filter: $filter) {
      id
      QId
      messagetype
      message
      cId
      pId
      projectname
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCreatorChats = /* GraphQL */ `
  subscription OnCreateCreatorChats(
    $filter: ModelSubscriptionCreatorChatsFilterInput
  ) {
    onCreateCreatorChats(filter: $filter) {
      id
      userID
      creatorID
      channelID
      displayname
      userdisplayname
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCreatorChats = /* GraphQL */ `
  subscription OnUpdateCreatorChats(
    $filter: ModelSubscriptionCreatorChatsFilterInput
  ) {
    onUpdateCreatorChats(filter: $filter) {
      id
      userID
      creatorID
      channelID
      displayname
      userdisplayname
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCreatorChats = /* GraphQL */ `
  subscription OnDeleteCreatorChats(
    $filter: ModelSubscriptionCreatorChatsFilterInput
  ) {
    onDeleteCreatorChats(filter: $filter) {
      id
      userID
      creatorID
      channelID
      displayname
      userdisplayname
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCreatorWallet = /* GraphQL */ `
  subscription OnCreateCreatorWallet(
    $filter: ModelSubscriptionCreatorWalletFilterInput
  ) {
    onCreateCreatorWallet(filter: $filter) {
      id
      userId
      amount
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCreatorWallet = /* GraphQL */ `
  subscription OnUpdateCreatorWallet(
    $filter: ModelSubscriptionCreatorWalletFilterInput
  ) {
    onUpdateCreatorWallet(filter: $filter) {
      id
      userId
      amount
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCreatorWallet = /* GraphQL */ `
  subscription OnDeleteCreatorWallet(
    $filter: ModelSubscriptionCreatorWalletFilterInput
  ) {
    onDeleteCreatorWallet(filter: $filter) {
      id
      userId
      amount
      createdAt
      updatedAt
    }
  }
`;
export const onCreateTransaction = /* GraphQL */ `
  subscription OnCreateTransaction(
    $filter: ModelSubscriptionTransactionFilterInput
  ) {
    onCreateTransaction(filter: $filter) {
      id
      userId
      projectId
      amount
      projectname
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTransaction = /* GraphQL */ `
  subscription OnUpdateTransaction(
    $filter: ModelSubscriptionTransactionFilterInput
  ) {
    onUpdateTransaction(filter: $filter) {
      id
      userId
      projectId
      amount
      projectname
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTransaction = /* GraphQL */ `
  subscription OnDeleteTransaction(
    $filter: ModelSubscriptionTransactionFilterInput
  ) {
    onDeleteTransaction(filter: $filter) {
      id
      userId
      projectId
      amount
      projectname
      createdAt
      updatedAt
    }
  }
`;
export const onCreateMoneyRequest = /* GraphQL */ `
  subscription OnCreateMoneyRequest(
    $filter: ModelSubscriptionMoneyRequestFilterInput
  ) {
    onCreateMoneyRequest(filter: $filter) {
      id
      user
      money
      upiId
      status
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateMoneyRequest = /* GraphQL */ `
  subscription OnUpdateMoneyRequest(
    $filter: ModelSubscriptionMoneyRequestFilterInput
  ) {
    onUpdateMoneyRequest(filter: $filter) {
      id
      user
      money
      upiId
      status
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteMoneyRequest = /* GraphQL */ `
  subscription OnDeleteMoneyRequest(
    $filter: ModelSubscriptionMoneyRequestFilterInput
  ) {
    onDeleteMoneyRequest(filter: $filter) {
      id
      user
      money
      upiId
      status
      createdAt
      updatedAt
    }
  }
`;
export const onCreateTransactionRazorpay = /* GraphQL */ `
  subscription OnCreateTransactionRazorpay(
    $filter: ModelSubscriptionTransactionRazorpayFilterInput
  ) {
    onCreateTransactionRazorpay(filter: $filter) {
      id
      userId
      paymnetId
      orderId
      signature
      projectId
      amount
      projectname
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTransactionRazorpay = /* GraphQL */ `
  subscription OnUpdateTransactionRazorpay(
    $filter: ModelSubscriptionTransactionRazorpayFilterInput
  ) {
    onUpdateTransactionRazorpay(filter: $filter) {
      id
      userId
      paymnetId
      orderId
      signature
      projectId
      amount
      projectname
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTransactionRazorpay = /* GraphQL */ `
  subscription OnDeleteTransactionRazorpay(
    $filter: ModelSubscriptionTransactionRazorpayFilterInput
  ) {
    onDeleteTransactionRazorpay(filter: $filter) {
      id
      userId
      paymnetId
      orderId
      signature
      projectId
      amount
      projectname
      createdAt
      updatedAt
    }
  }
`;
export const onCreateProjectApproved = /* GraphQL */ `
  subscription OnCreateProjectApproved(
    $filter: ModelSubscriptionProjectApprovedFilterInput
  ) {
    onCreateProjectApproved(filter: $filter) {
      id
      username
      projectname
      industry
      firstname
      lastname
      preference
      companyname
      accepted
      declined
      price
      demo
      final
      status
      demouserstatus
      demoadminstatus
      finaluserstatus
      finaladminstatus
      delivered
      creatorId
      creatorName
      templateId
      category
      moredetail
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateProjectApproved = /* GraphQL */ `
  subscription OnUpdateProjectApproved(
    $filter: ModelSubscriptionProjectApprovedFilterInput
  ) {
    onUpdateProjectApproved(filter: $filter) {
      id
      username
      projectname
      industry
      firstname
      lastname
      preference
      companyname
      accepted
      declined
      price
      demo
      final
      status
      demouserstatus
      demoadminstatus
      finaluserstatus
      finaladminstatus
      delivered
      creatorId
      creatorName
      templateId
      category
      moredetail
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteProjectApproved = /* GraphQL */ `
  subscription OnDeleteProjectApproved(
    $filter: ModelSubscriptionProjectApprovedFilterInput
  ) {
    onDeleteProjectApproved(filter: $filter) {
      id
      username
      projectname
      industry
      firstname
      lastname
      preference
      companyname
      accepted
      declined
      price
      demo
      final
      status
      demouserstatus
      demoadminstatus
      finaluserstatus
      finaladminstatus
      delivered
      creatorId
      creatorName
      templateId
      category
      moredetail
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCategories = /* GraphQL */ `
  subscription OnCreateCategories(
    $filter: ModelSubscriptionCategoriesFilterInput
  ) {
    onCreateCategories(filter: $filter) {
      id
      categoryId
      categoryprice
      categoryname
      image
      templates {
        id
        templateId
        categoryId
        templateprice
        templatename
        image
        image1
        image2
        thumbnail
        templatedetail
        createdAt
        updatedAt
      }
      categorydetail
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCategories = /* GraphQL */ `
  subscription OnUpdateCategories(
    $filter: ModelSubscriptionCategoriesFilterInput
  ) {
    onUpdateCategories(filter: $filter) {
      id
      categoryId
      categoryprice
      categoryname
      image
      templates {
        id
        templateId
        categoryId
        templateprice
        templatename
        image
        image1
        image2
        thumbnail
        templatedetail
        createdAt
        updatedAt
      }
      categorydetail
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCategories = /* GraphQL */ `
  subscription OnDeleteCategories(
    $filter: ModelSubscriptionCategoriesFilterInput
  ) {
    onDeleteCategories(filter: $filter) {
      id
      categoryId
      categoryprice
      categoryname
      image
      templates {
        id
        templateId
        categoryId
        templateprice
        templatename
        image
        image1
        image2
        thumbnail
        templatedetail
        createdAt
        updatedAt
      }
      categorydetail
      createdAt
      updatedAt
    }
  }
`;
export const onCreateTemplate = /* GraphQL */ `
  subscription OnCreateTemplate($filter: ModelSubscriptionTemplateFilterInput) {
    onCreateTemplate(filter: $filter) {
      id
      templateId
      categoryId
      templateprice
      templatename
      image
      image1
      image2
      thumbnail
      templatedetail
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTemplate = /* GraphQL */ `
  subscription OnUpdateTemplate($filter: ModelSubscriptionTemplateFilterInput) {
    onUpdateTemplate(filter: $filter) {
      id
      templateId
      categoryId
      templateprice
      templatename
      image
      image1
      image2
      thumbnail
      templatedetail
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTemplate = /* GraphQL */ `
  subscription OnDeleteTemplate($filter: ModelSubscriptionTemplateFilterInput) {
    onDeleteTemplate(filter: $filter) {
      id
      templateId
      categoryId
      templateprice
      templatename
      image
      image1
      image2
      thumbnail
      templatedetail
      createdAt
      updatedAt
    }
  }
`;
