const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;


// export async function getListEntries(authToken) {
export async function getListEntries() {
  // console.log("getListEntries");
  // console.log(backend_base);
  const result = await fetch(backend_base + "/listEntries", {
    'method': 'GET',
    // 'headers': {'Authorization': 'Bearer ' + authToken}
  })
  // console.log("getListEntries result");
  return await result.json();
}

export async function addListEntry(desc, category, userId) {
  // console.log("addListEntry");
  // console.log(JSON.stringify({
  //   desc,
  //   category,
  //   userId,
  // }));

  const result = await fetch(backend_base + "/listEntries", {
    'method': 'POST',
    'headers': {
      // 'Authorization': 'Bearer ' + authToken,
      'Content-Type': 'application/json'
    },
    'body': JSON.stringify({
      "desc": desc,
      "category": category,
      "userId": userId,
    })
  })
  return await result.json();
}

export async function setListItemDone(id, status) {
  // console.log("setListItemDone");
  // console.log(JSON.stringify({
  //   "completed": status
  // }));
  const url = backend_base + "/listEntries/" + id;
  // console.log(url);
  const result = await fetch(backend_base + "/listEntries/" + id, {
    'method': 'PATCH',
    'headers': {
      // 'Authorization': 'Bearer ' + authToken,
      'Content-Type': 'application/json'
    },
    'body': JSON.stringify({
      "completed": status
    })
  })
  return await result.json();
}
export async function editListEntryDesc(id, desc) {
  // console.log("setListItemDone");
  // console.log(JSON.stringify({
  //   desc
  // }));
  const url = backend_base + "/listEntries/" + id;
  // console.log(url);
  const result = await fetch(backend_base + "/listEntries/" + id, {
    'method': 'PATCH',
    'headers': {
      // 'Authorization': 'Bearer ' + authToken,
      'Content-Type': 'application/json'
    },
    'body': JSON.stringify({
      desc
    })
  })
  return await result.json();
}

export async function getListEntriesByUserId(userId, completed) {
  const url = backend_base + "/listEntries?" + new URLSearchParams({
    userId
  }) + "&" + new URLSearchParams({
    completed
  });
  // console.log("getListEntriesByUserId");
  // console.log(url);
  const result = await fetch(url, {
    'method': 'GET',
    // 'headers': {'Authorization': 'Bearer ' + authToken}
  })
  return await result.json();
}

export async function getListEntriesByCategory(category) {
  const result = await fetch(backend_base + "/listEntries?" + new URLSearchParams({
    category
  }), {
    'method': 'GET',
    // 'headers': {'Authorization': 'Bearer ' + authToken}
  })

  return await result.json();
}

export async function getListEntryById(id) {
  const url = backend_base + "/listEntries?" + new URLSearchParams({
    "_id": id
  });
  // console.log(url);

  const result = await fetch(url, {
    'method': 'GET',
    // 'headers': {'Authorization': 'Bearer ' + authToken}
  })
  return await result.json();
}

export async function getCategoryListByUserId(userId) {
  const url = backend_base + "/userCategories?" + new URLSearchParams({
    userId
  });
  // console.log(url);
  const result = await fetch(url, {
    'method': 'GET',
    // 'headers': {'Authorization': 'Bearer ' + authToken}
  })  
  return await result.json();
}

export async function addCategoryEntry(category, userId) {
  // console.log("addCategoryEntry");
  const DataRet = {}
  // console.log(category);
  // console.log(DataRet);
  // console.log(DataRet["categories"] === undefined);
  if (DataRet["categories"] === undefined) {
    // console.log("addCategoryEntry");
    // console.log(JSON.stringify({
    //   "categories": ["None"].concat(category),
    //   userId,
    // }));
    const url = backend_base + "/userCategories";
    const result = await fetch(url, {
      'method': 'POST',
      'headers': {
        // 'Authorization': 'Bearer ' + authToken,
        'Content-Type': 'application/json'
      },
      'body': JSON.stringify({
        "categories": ["None"].concat(category),
        userId,
      })
    })
    return await result.json();
  } else {
    // console.log("addCategoryEntry");
    // console.log(JSON.stringify({
    //   category,
    //   userId,
    // }));
    const url = backend_base + "/userData?" + new URLSearchParams({
      userId
    });
    const result = await fetch(url, {
      'method': 'PATCH',
      'headers': {
        // 'Authorization': 'Bearer ' + authToken,
        'Content-Type': 'application/json'
      },
      'body': JSON.stringify({
        category,
      })
    })
    return await result.json();
  }
}