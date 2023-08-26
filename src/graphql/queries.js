/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserDetail = /* GraphQL */ `
  query GetUserDetail($id: ID!) {
    getUserDetail(id: $id) {
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
export const listUserDetails = /* GraphQL */ `
  query ListUserDetails(
    $filter: ModelUserDetailFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserDetails(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getCreatorDetail = /* GraphQL */ `
  query GetCreatorDetail($id: ID!) {
    getCreatorDetail(id: $id) {
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
export const listCreatorDetails = /* GraphQL */ `
  query ListCreatorDetails(
    $filter: ModelCreatorDetailFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCreatorDetails(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getCreatorApproved = /* GraphQL */ `
  query GetCreatorApproved($id: ID!) {
    getCreatorApproved(id: $id) {
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
export const listCreatorApproveds = /* GraphQL */ `
  query ListCreatorApproveds(
    $filter: ModelCreatorApprovedFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCreatorApproveds(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getNote = /* GraphQL */ `
  query GetNote($id: ID!) {
    getNote(id: $id) {
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
export const listNotes = /* GraphQL */ `
  query ListNotes(
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getOrders = /* GraphQL */ `
  query GetOrders($id: ID!) {
    getOrders(id: $id) {
      id
      ordername
      customername
      projectname
      createdAt
      updatedAt
    }
  }
`;
export const listOrders = /* GraphQL */ `
  query ListOrders(
    $filter: ModelOrdersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        ordername
        customername
        projectname
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getOrderConfirmed = /* GraphQL */ `
  query GetOrderConfirmed($id: ID!) {
    getOrderConfirmed(id: $id) {
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
export const listOrderConfirmeds = /* GraphQL */ `
  query ListOrderConfirmeds(
    $filter: ModelOrderConfirmedFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrderConfirmeds(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
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
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        channelID
        displayname
        author
        body
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getNotification = /* GraphQL */ `
  query GetNotification($id: ID!) {
    getNotification(id: $id) {
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
export const listNotifications = /* GraphQL */ `
  query ListNotifications(
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getCreatorChats = /* GraphQL */ `
  query GetCreatorChats($id: ID!) {
    getCreatorChats(id: $id) {
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
export const listCreatorChats = /* GraphQL */ `
  query ListCreatorChats(
    $filter: ModelCreatorChatsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCreatorChats(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        creatorID
        channelID
        displayname
        userdisplayname
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCreatorWallet = /* GraphQL */ `
  query GetCreatorWallet($id: ID!) {
    getCreatorWallet(id: $id) {
      id
      userId
      amount
      createdAt
      updatedAt
    }
  }
`;
export const listCreatorWallets = /* GraphQL */ `
  query ListCreatorWallets(
    $filter: ModelCreatorWalletFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCreatorWallets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        amount
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTransaction = /* GraphQL */ `
  query GetTransaction($id: ID!) {
    getTransaction(id: $id) {
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
export const listTransactions = /* GraphQL */ `
  query ListTransactions(
    $filter: ModelTransactionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTransactions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        projectId
        amount
        projectname
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getMoneyRequest = /* GraphQL */ `
  query GetMoneyRequest($id: ID!) {
    getMoneyRequest(id: $id) {
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
export const listMoneyRequests = /* GraphQL */ `
  query ListMoneyRequests(
    $filter: ModelMoneyRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMoneyRequests(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user
        money
        upiId
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTransactionRazorpay = /* GraphQL */ `
  query GetTransactionRazorpay($id: ID!) {
    getTransactionRazorpay(id: $id) {
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
export const listTransactionRazorpays = /* GraphQL */ `
  query ListTransactionRazorpays(
    $filter: ModelTransactionRazorpayFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTransactionRazorpays(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const dataByQuerryID = /* GraphQL */ `
  query DataByQuerryID(
    $QId: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserDetailFilterInput
    $limit: Int
    $nextToken: String
  ) {
    dataByQuerryID(
      QId: $QId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const creatorDataByUserID = /* GraphQL */ `
  query CreatorDataByUserID(
    $id: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCreatorDetailFilterInput
    $limit: Int
    $nextToken: String
  ) {
    creatorDataByUserID(
      id: $id
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const creatorDataByQuerryID = /* GraphQL */ `
  query CreatorDataByQuerryID(
    $QId: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCreatorDetailFilterInput
    $limit: Int
    $nextToken: String
  ) {
    creatorDataByQuerryID(
      QId: $QId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const creatorApprovedDataByUserID = /* GraphQL */ `
  query CreatorApprovedDataByUserID(
    $id: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCreatorApprovedFilterInput
    $limit: Int
    $nextToken: String
  ) {
    creatorApprovedDataByUserID(
      id: $id
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const creatorApprovedDataByQuerryID = /* GraphQL */ `
  query CreatorApprovedDataByQuerryID(
    $QId: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCreatorApprovedFilterInput
    $limit: Int
    $nextToken: String
  ) {
    creatorApprovedDataByQuerryID(
      QId: $QId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const projectByProjectID = /* GraphQL */ `
  query ProjectByProjectID(
    $id: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    projectByProjectID(
      id: $id
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const projectByUserID = /* GraphQL */ `
  query ProjectByUserID(
    $username: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    projectByUserID(
      username: $username
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const messagesByChannelID = /* GraphQL */ `
  query MessagesByChannelID(
    $channelID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    messagesByChannelID(
      channelID: $channelID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        channelID
        displayname
        author
        body
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const notificationByQuerryID = /* GraphQL */ `
  query NotificationByQuerryID(
    $QId: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    notificationByQuerryID(
      QId: $QId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const creatorChatsByUserID = /* GraphQL */ `
  query CreatorChatsByUserID(
    $userID: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCreatorChatsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    creatorChatsByUserID(
      userID: $userID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        creatorID
        channelID
        displayname
        userdisplayname
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const creatorChatsByQuerryID = /* GraphQL */ `
  query CreatorChatsByQuerryID(
    $creatorID: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCreatorChatsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    creatorChatsByQuerryID(
      creatorID: $creatorID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        creatorID
        channelID
        displayname
        userdisplayname
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const creatorChatsByChannelID = /* GraphQL */ `
  query CreatorChatsByChannelID(
    $channelID: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCreatorChatsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    creatorChatsByChannelID(
      channelID: $channelID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        creatorID
        channelID
        displayname
        userdisplayname
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const walletByUserID = /* GraphQL */ `
  query WalletByUserID(
    $userId: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCreatorWalletFilterInput
    $limit: Int
    $nextToken: String
  ) {
    walletByUserID(
      userId: $userId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        amount
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const transactionByQuerryID = /* GraphQL */ `
  query TransactionByQuerryID(
    $userId: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTransactionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    transactionByQuerryID(
      userId: $userId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        projectId
        amount
        projectname
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const transactionByProjectID = /* GraphQL */ `
  query TransactionByProjectID(
    $projectId: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTransactionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    transactionByProjectID(
      projectId: $projectId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        projectId
        amount
        projectname
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const moneyrequestByUserID = /* GraphQL */ `
  query MoneyrequestByUserID(
    $user: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMoneyRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    moneyrequestByUserID(
      user: $user
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        user
        money
        upiId
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const transactionRazorpayByQuerryID = /* GraphQL */ `
  query TransactionRazorpayByQuerryID(
    $userId: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTransactionRazorpayFilterInput
    $limit: Int
    $nextToken: String
  ) {
    transactionRazorpayByQuerryID(
      userId: $userId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const transactionRazorpayByProjectID = /* GraphQL */ `
  query TransactionRazorpayByProjectID(
    $projectId: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTransactionRazorpayFilterInput
    $limit: Int
    $nextToken: String
  ) {
    transactionRazorpayByProjectID(
      projectId: $projectId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getProjectApproved = /* GraphQL */ `
  query GetProjectApproved($id: ID!) {
    getProjectApproved(id: $id) {
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
export const listProjectApproveds = /* GraphQL */ `
  query ListProjectApproveds(
    $filter: ModelProjectApprovedFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProjectApproveds(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const projectByProjectApprovedID = /* GraphQL */ `
  query ProjectByProjectApprovedID(
    $id: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProjectApprovedFilterInput
    $limit: Int
    $nextToken: String
  ) {
    projectByProjectApprovedID(
      id: $id
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const projectApprovedByUserID = /* GraphQL */ `
  query ProjectApprovedByUserID(
    $username: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProjectApprovedFilterInput
    $limit: Int
    $nextToken: String
  ) {
    projectApprovedByUserID(
      username: $username
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const projectApprovedByCreatorID = /* GraphQL */ `
  query ProjectApprovedByCreatorID(
    $creatorId: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProjectApprovedFilterInput
    $limit: Int
    $nextToken: String
  ) {
    projectApprovedByCreatorID(
      creatorId: $creatorId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getCategories = /* GraphQL */ `
  query GetCategories($id: ID!) {
    getCategories(id: $id) {
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
export const listCategories = /* GraphQL */ `
  query ListCategories(
    $filter: ModelCategoriesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCategories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const categoryDetailByCategoryID = /* GraphQL */ `
  query CategoryDetailByCategoryID(
    $categoryId: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCategoriesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    categoryDetailByCategoryID(
      categoryId: $categoryId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const categoryDetailByCategoryName = /* GraphQL */ `
  query CategoryDetailByCategoryName(
    $categoryname: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCategoriesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    categoryDetailByCategoryName(
      categoryname: $categoryname
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getTemplate = /* GraphQL */ `
  query GetTemplate($id: ID!) {
    getTemplate(id: $id) {
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
export const listTemplates = /* GraphQL */ `
  query ListTemplates(
    $filter: ModelTemplateFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTemplates(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const templateByTemplateID = /* GraphQL */ `
  query TemplateByTemplateID(
    $templateId: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTemplateFilterInput
    $limit: Int
    $nextToken: String
  ) {
    templateByTemplateID(
      templateId: $templateId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const templateByCategoryID = /* GraphQL */ `
  query TemplateByCategoryID(
    $categoryId: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTemplateFilterInput
    $limit: Int
    $nextToken: String
  ) {
    templateByCategoryID(
      categoryId: $categoryId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
