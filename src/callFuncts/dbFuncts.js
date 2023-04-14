const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export async function getGroups(authToken) {
    const result = await fetch(backend_base+"/groups",{
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    return await result.json();
}



export async function deleteGroup(authToken, group) {
    const result = await fetch(backend_base+"/groups/"+group._id,{
        'method':'DELETE',
        'headers': {'Authorization': 'Bearer ' + authToken},
    })
    return await result.json();
}

// export async function getListEntries(authToken) {
  export async function getListEntries() {
    // console.log("getListEntries");
    // console.log(backend_base);
    const result = await fetch(backend_base+"/listEntries",{
        'method':'GET',
        // 'headers': {'Authorization': 'Bearer ' + authToken}
    })
    return await result.json();
}

export async function addListEntry(title,desc,category) {
  const result = await fetch(backend_base+"/listEntries",{
      'method':'POST',
      'headers': {
        // 'Authorization': 'Bearer ' + authToken,
      'Content-Type': 'application/json'},
      'body': JSON.stringify({
        "title" : title,
        "desc" : desc,
        "category" : category,
        "userId": "0",
      })
  })
  return await result.json();
}

export async function getReview(authToken, group) {
    
    const result = await fetch(backend_base+"/pres?" + new URLSearchParams({group}), {
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    if (result.ok) {
        const reviews =  await result.json();
        if (reviews.length >0) {
            return reviews[0]
        } else {
            return null
        }
    } else {
        return null;
    }
}

export async function postReview(authToken, group, notes, score) {
    const result = await fetch(backend_base+"/pres", {
        'method':'POST',
        'headers': {'Authorization': 'Bearer ' + authToken,
        'Content-Type': 'application/json'},
        'body': JSON.stringify({group,
            notes,
            score})
    });
    return await result.json();
}



export async function updateReview(authToken, review) {
    const result = await fetch(backend_base+"/pres/"+review._id, {
        'method':'PUT',
        'headers': {'Authorization': 'Bearer ' + authToken,
        'Content-Type': 'application/json'},
        'body': JSON.stringify(review)
    });
    return await result.json();
}