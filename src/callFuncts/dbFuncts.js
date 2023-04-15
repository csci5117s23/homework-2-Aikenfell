const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export async function getGroups(authToken) {
  const result = await fetch(backend_base + "/groups", {
    'method': 'GET',
    'headers': {
      'Authorization': 'Bearer ' + authToken
    }
  })
  return await result.json();
}


export async function deleteGroup(authToken, group) {
  const result = await fetch(backend_base + "/groups/" + group._id, {
    'method': 'DELETE',
    'headers': {
      'Authorization': 'Bearer ' + authToken
    },
  })
  return await result.json();
}

// export async function getListEntries(authToken) {
export async function getListEntries() {
  // console.log("getListEntries");
  // console.log(backend_base);
  const result = await fetch(backend_base + "/listEntries", {
    'method': 'GET',
    // 'headers': {'Authorization': 'Bearer ' + authToken}
  })
  console.log("getListEntries result");
  return await result.json();
}

export async function addListEntry(desc, category, userId) {
  console.log("addListEntry");
  console.log(JSON.stringify({
    desc,
    category,
    userId,
  }));

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

export async function setListItemDone(id,status) {
  console.log("setListItemDone");
  console.log(JSON.stringify({
    "completed": status
  }));
  const url = backend_base + "/listEntries/" + id;
  console.log(url);
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
export async function editListEntryDesc(id,desc) {
  console.log("setListItemDone");
  console.log(JSON.stringify({
    desc
  }));
  const url = backend_base + "/listEntries/" + id;
  console.log(url);
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

export async function getListEntriesByUserId(userId,completed) {
  const url = backend_base + "/listEntries?" + new URLSearchParams({ userId}) + "&" + new URLSearchParams({completed});
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
  const url = backend_base + "/listEntries?" + new URLSearchParams({"_id" :id});
  console.log(url);

  const result = await fetch(url, {
    'method': 'GET',
    // 'headers': {'Authorization': 'Bearer ' + authToken}
  })
  return await result.json();
}

// export async function deleteListEntry(authToken, listEntry) {
//     const result = await fetch(backend_base+"/listEntries/"+listEntry._id,{
//         'method':'DELETE',
//         'headers': {'Authorization': 'Bearer ' + authToken},
//     })
//     return await result.json();
// }


export async function getReview(authToken, group) {

  const result = await fetch(backend_base + "/pres?" + new URLSearchParams({
    group
  }), {
    'method': 'GET',
    'headers': {
      'Authorization': 'Bearer ' + authToken
    }
  })
  if (result.ok) {
    const reviews = await result.json();
    if (reviews.length > 0) {
      return reviews[0]
    } else {
      return null
    }
  } else {
    return null;
  }
}

export async function postReview(authToken, group, notes, score) {
  const result = await fetch(backend_base + "/pres", {
    'method': 'POST',
    'headers': {
      'Authorization': 'Bearer ' + authToken,
      'Content-Type': 'application/json'
    },
    'body': JSON.stringify({
      group,
      notes,
      score
    })
  });
  return await result.json();
}



export async function updateReview(authToken, review) {
  const result = await fetch(backend_base + "/pres/" + review._id, {
    'method': 'PUT',
    'headers': {
      'Authorization': 'Bearer ' + authToken,
      'Content-Type': 'application/json'
    },
    'body': JSON.stringify(review)
  });
  return await result.json();
}