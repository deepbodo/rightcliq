/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUserDetail = /* GraphQL */ `
  mutation CreateUserDetail(
    $input: CreateUserDetailInput!
    $condition: ModelUserDetailConditionInput
  ) {
    createUserDetail(input: $input, condition: $condition) {
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
export const updateUserDetail = /* GraphQL */ `
  mutation UpdateUserDetail(
    $input: UpdateUserDetailInput!
    $condition: ModelUserDetailConditionInput
  ) {
    updateUserDetail(input: $input, condition: $condition) {
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
export const deleteUserDetail = /* GraphQL */ `
  mutation DeleteUserDetail(
    $input: DeleteUserDetailInput!
    $condition: ModelUserDetailConditionInput
  ) {
    deleteUserDetail(input: $input, condition: $condition) {
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
export const createCreatorDetail = /* GraphQL */ `
  mutation CreateCreatorDetail(
    $input: CreateCreatorDetailInput!
    $condition: ModelCreatorDetailConditionInput
  ) {
    createCreatorDetail(input: $input, condition: $condition) {
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
export const updateCreatorDetail = /* GraphQL */ `
  mutation UpdateCreatorDetail(
    $input: UpdateCreatorDetailInput!
    $condition: ModelCreatorDetailConditionInput
  ) {
    updateCreatorDetail(input: $input, condition: $condition) {
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
export const deleteCreatorDetail = /* GraphQL */ `
  mutation DeleteCreatorDetail(
    $input: DeleteCreatorDetailInput!
    $condition: ModelCreatorDetailConditionInput
  ) {
    deleteCreatorDetail(input: $input, condition: $condition) {
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
export const createCreatorApproved = /* GraphQL */ `
  mutation CreateCreatorApproved(
    $input: CreateCreatorApprovedInput!
    $condition: ModelCreatorApprovedConditionInput
  ) {
    createCreatorApproved(input: $input, condition: $condition) {
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
export const updateCreatorApproved = /* GraphQL */ `
  mutation UpdateCreatorApproved(
    $input: UpdateCreatorApprovedInput!
    $condition: ModelCreatorApprovedConditionInput
  ) {
    updateCreatorApproved(input: $input, condition: $condition) {
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
export const deleteCreatorApproved = /* GraphQL */ `
  mutation DeleteCreatorApproved(
    $input: DeleteCreatorApprovedInput!
    $condition: ModelCreatorApprovedConditionInput
  ) {
    deleteCreatorApproved(input: $input, condition: $condition) {
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
export const createNote = /* GraphQL */ `
  mutation CreateNote(
    $input: CreateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    createNote(input: $input, condition: $condition) {
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
export const updateNote = /* GraphQL */ `
  mutation UpdateNote(
    $input: UpdateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    updateNote(input: $input, condition: $condition) {
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
export const deleteNote = /* GraphQL */ `
  mutation DeleteNote(
    $input: DeleteNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    deleteNote(input: $input, condition: $condition) {
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
export const createOrders = /* GraphQL */ `
  mutation CreateOrders(
    $input: CreateOrdersInput!
    $condition: ModelOrdersConditionInput
  ) {
    createOrders(input: $input, condition: $condition) {
      id
      ordername
      customername
      projectname
      createdAt
      updatedAt
    }
  }
`;
export const updateOrders = /* GraphQL */ `
  mutation UpdateOrders(
    $input: UpdateOrdersInput!
    $condition: ModelOrdersConditionInput
  ) {
    updateOrders(input: $input, condition: $condition) {
      id
      ordername
      customername
      projectname
      createdAt
      updatedAt
    }
  }
`;
export const deleteOrders = /* GraphQL */ `
  mutation DeleteOrders(
    $input: DeleteOrdersInput!
    $condition: ModelOrdersConditionInput
  ) {
    deleteOrders(input: $input, condition: $condition) {
      id
      ordername
      customername
      projectname
      createdAt
      updatedAt
    }
  }
`;
export const createOrderConfirmed = /* GraphQL */ `
  mutation CreateOrderConfirmed(
    $input: CreateOrderConfirmedInput!
    $condition: ModelOrderConfirmedConditionInput
  ) {
    createOrderConfirmed(input: $input, condition: $condition) {
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
export const updateOrderConfirmed = /* GraphQL */ `
  mutation UpdateOrderConfirmed(
    $input: UpdateOrderConfirmedInput!
    $condition: ModelOrderConfirmedConditionInput
  ) {
    updateOrderConfirmed(input: $input, condition: $condition) {
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
export const deleteOrderConfirmed = /* GraphQL */ `
  mutation DeleteOrderConfirmed(
    $input: DeleteOrderConfirmedInput!
    $condition: ModelOrderConfirmedConditionInput
  ) {
    deleteOrderConfirmed(input: $input, condition: $condition) {
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
export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
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
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
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
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
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
export const createNotification = /* GraphQL */ `
  mutation CreateNotification(
    $input: CreateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    createNotification(input: $input, condition: $condition) {
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
export const updateNotification = /* GraphQL */ `
  mutation UpdateNotification(
    $input: UpdateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    updateNotification(input: $input, condition: $condition) {
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
export const deleteNotification = /* GraphQL */ `
  mutation DeleteNotification(
    $input: DeleteNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    deleteNotification(input: $input, condition: $condition) {
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
export const createCreatorChats = /* GraphQL */ `
  mutation CreateCreatorChats(
    $input: CreateCreatorChatsInput!
    $condition: ModelCreatorChatsConditionInput
  ) {
    createCreatorChats(input: $input, condition: $condition) {
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
export const updateCreatorChats = /* GraphQL */ `
  mutation UpdateCreatorChats(
    $input: UpdateCreatorChatsInput!
    $condition: ModelCreatorChatsConditionInput
  ) {
    updateCreatorChats(input: $input, condition: $condition) {
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
export const deleteCreatorChats = /* GraphQL */ `
  mutation DeleteCreatorChats(
    $input: DeleteCreatorChatsInput!
    $condition: ModelCreatorChatsConditionInput
  ) {
    deleteCreatorChats(input: $input, condition: $condition) {
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
export const createCreatorWallet = /* GraphQL */ `
  mutation CreateCreatorWallet(
    $input: CreateCreatorWalletInput!
    $condition: ModelCreatorWalletConditionInput
  ) {
    createCreatorWallet(input: $input, condition: $condition) {
      id
      userId
      amount
      createdAt
      updatedAt
    }
  }
`;
export const updateCreatorWallet = /* GraphQL */ `
  mutation UpdateCreatorWallet(
    $input: UpdateCreatorWalletInput!
    $condition: ModelCreatorWalletConditionInput
  ) {
    updateCreatorWallet(input: $input, condition: $condition) {
      id
      userId
      amount
      createdAt
      updatedAt
    }
  }
`;
export const deleteCreatorWallet = /* GraphQL */ `
  mutation DeleteCreatorWallet(
    $input: DeleteCreatorWalletInput!
    $condition: ModelCreatorWalletConditionInput
  ) {
    deleteCreatorWallet(input: $input, condition: $condition) {
      id
      userId
      amount
      createdAt
      updatedAt
    }
  }
`;
export const createTransaction = /* GraphQL */ `
  mutation CreateTransaction(
    $input: CreateTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    createTransaction(input: $input, condition: $condition) {
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
export const updateTransaction = /* GraphQL */ `
  mutation UpdateTransaction(
    $input: UpdateTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    updateTransaction(input: $input, condition: $condition) {
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
export const deleteTransaction = /* GraphQL */ `
  mutation DeleteTransaction(
    $input: DeleteTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    deleteTransaction(input: $input, condition: $condition) {
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
export const createMoneyRequest = /* GraphQL */ `
  mutation CreateMoneyRequest(
    $input: CreateMoneyRequestInput!
    $condition: ModelMoneyRequestConditionInput
  ) {
    createMoneyRequest(input: $input, condition: $condition) {
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
export const updateMoneyRequest = /* GraphQL */ `
  mutation UpdateMoneyRequest(
    $input: UpdateMoneyRequestInput!
    $condition: ModelMoneyRequestConditionInput
  ) {
    updateMoneyRequest(input: $input, condition: $condition) {
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
export const deleteMoneyRequest = /* GraphQL */ `
  mutation DeleteMoneyRequest(
    $input: DeleteMoneyRequestInput!
    $condition: ModelMoneyRequestConditionInput
  ) {
    deleteMoneyRequest(input: $input, condition: $condition) {
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
export const createTransactionRazorpay = /* GraphQL */ `
  mutation CreateTransactionRazorpay(
    $input: CreateTransactionRazorpayInput!
    $condition: ModelTransactionRazorpayConditionInput
  ) {
    createTransactionRazorpay(input: $input, condition: $condition) {
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
export const updateTransactionRazorpay = /* GraphQL */ `
  mutation UpdateTransactionRazorpay(
    $input: UpdateTransactionRazorpayInput!
    $condition: ModelTransactionRazorpayConditionInput
  ) {
    updateTransactionRazorpay(input: $input, condition: $condition) {
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
export const deleteTransactionRazorpay = /* GraphQL */ `
  mutation DeleteTransactionRazorpay(
    $input: DeleteTransactionRazorpayInput!
    $condition: ModelTransactionRazorpayConditionInput
  ) {
    deleteTransactionRazorpay(input: $input, condition: $condition) {
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
export const createProjectApproved = /* GraphQL */ `
  mutation CreateProjectApproved(
    $input: CreateProjectApprovedInput!
    $condition: ModelProjectApprovedConditionInput
  ) {
    createProjectApproved(input: $input, condition: $condition) {
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
export const updateProjectApproved = /* GraphQL */ `
  mutation UpdateProjectApproved(
    $input: UpdateProjectApprovedInput!
    $condition: ModelProjectApprovedConditionInput
  ) {
    updateProjectApproved(input: $input, condition: $condition) {
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
export const deleteProjectApproved = /* GraphQL */ `
  mutation DeleteProjectApproved(
    $input: DeleteProjectApprovedInput!
    $condition: ModelProjectApprovedConditionInput
  ) {
    deleteProjectApproved(input: $input, condition: $condition) {
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
export const createCategories = /* GraphQL */ `
  mutation CreateCategories(
    $input: CreateCategoriesInput!
    $condition: ModelCategoriesConditionInput
  ) {
    createCategories(input: $input, condition: $condition) {
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
export const updateCategories = /* GraphQL */ `
  mutation UpdateCategories(
    $input: UpdateCategoriesInput!
    $condition: ModelCategoriesConditionInput
  ) {
    updateCategories(input: $input, condition: $condition) {
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
export const deleteCategories = /* GraphQL */ `
  mutation DeleteCategories(
    $input: DeleteCategoriesInput!
    $condition: ModelCategoriesConditionInput
  ) {
    deleteCategories(input: $input, condition: $condition) {
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
export const createTemplate = /* GraphQL */ `
  mutation CreateTemplate(
    $input: CreateTemplateInput!
    $condition: ModelTemplateConditionInput
  ) {
    createTemplate(input: $input, condition: $condition) {
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
export const updateTemplate = /* GraphQL */ `
  mutation UpdateTemplate(
    $input: UpdateTemplateInput!
    $condition: ModelTemplateConditionInput
  ) {
    updateTemplate(input: $input, condition: $condition) {
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
export const deleteTemplate = /* GraphQL */ `
  mutation DeleteTemplate(
    $input: DeleteTemplateInput!
    $condition: ModelTemplateConditionInput
  ) {
    deleteTemplate(input: $input, condition: $condition) {
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
