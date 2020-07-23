export const EXPENSES_API_BASE = "http://localhost:8080/api";

class ExpensesAPI {
  async findAllincomes(auth) {
    const response = await fetch(
      `${EXPENSES_API_BASE}/balanceChanges/income/${auth.user._id}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      }
    );
    return await response.json();
  }

  async findAllPayments(auth) {
    const response = await fetch(
      `${EXPENSES_API_BASE}/balanceChanges/payment/${auth.user._id}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      }
    );
    return await response.json();
  }

  async findPaymentsByCategory(token, category) {
    const response = await fetch(
      `${EXPENSES_API_BASE}/balanceChanges/category/payment/${category}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    const payments = await response.json();
    return payments.result;
  }

  async findBalanceById(id, token) {
    const response = await fetch(`${EXPENSES_API_BASE}/balanceChanges/${id}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const balance = await response.json();
    return balance.result;
  }

  async createIncome(income, auth) {
    const postsResp = await fetch(EXPENSES_API_BASE + "/balanceChanges", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.token,
      },
      body: JSON.stringify(income),
    });
    return await postsResp.json();
  }

  // async updatePost(post) {
  //     const postsResp = await fetch(
  //         BLOG_API_BASE + "/posts/" + encodeURIComponent(post.id),
  //         {
  //             method: 'PUT',
  //             headers: {
  //                 'Content-Type': 'application/json',
  //             },
  //             body: JSON.stringify(post)
  //         }
  //     );
  //     const postUpdated = await postsResp.json();
  //     if(postsResp.status >= 400) { //error status code
  //         console.log("Error updating Post:", postUpdated);
  //         throw(postUpdated.message);
  //     }
  //     console.log("POST updated successfully", postUpdated);
  //     return postUpdated;
  // }

  // async deletePostById(id) {
  //     const deleteResp = await fetch(
  //         BLOG_API_BASE + "/posts/"+ encodeURIComponent(id),
  //         {
  //             method: 'DELETE'
  //         }
  //     );
  //     const deleted = await deleteResp.json();
  //     if(deleteResp.status >= 400) { //error status code
  //         console.log("Error deleting Post:", deleted);
  //         throw(deleted.message);
  //     }
  //     console.log("POST deleted successfully", deleted);
  //     return deleted;
  // }

  async deleteUserById(id, auth) {
    const deleteResp = await fetch(`${EXPENSES_API_BASE}/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + auth.token,
      },
    });
    const deleted = await deleteResp.json();
    if (deleteResp.status >= 400) {
      //error status code
      console.log("Error deleting Post:", deleted);
      throw deleted.message;
    }
    return deleted;
  }

  async updateUserById(id, auth, user) {
    const updateResp = await fetch(`${EXPENSES_API_BASE}/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.token,
      },
      body: JSON.stringify(user),
    });
    return await updateResp.json();
  }

  async findAllUsers(auth) {
    const usersResp = await fetch(`${EXPENSES_API_BASE}/users`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + auth.token,
      },
    });
    return await usersResp.json();
  }

  async findAllUsersList() {
    const usersResp = await fetch(`${EXPENSES_API_BASE}/users/list`, {
      method: "GET",
    });
    return await usersResp.json();
  }

  async findUserById(id, token) {
    const usersResp = await fetch(`${EXPENSES_API_BASE}/users/${id}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const result = await usersResp.json();
    return result.user;
  }

  async createUser(user) {
    const usersResp = await fetch(EXPENSES_API_BASE + "/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await usersResp.json();
  }

  async login(credentials) {
    const userResp = await fetch(`${EXPENSES_API_BASE}/account/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    return await userResp.json();
  }  
  
  async logout(token) {
    const userResp = await fetch(`${EXPENSES_API_BASE}/account/logout`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      }
    });
    return await userResp.json();
  }

  async validateUser(token) {
    const response = await fetch(EXPENSES_API_BASE + "/account/verify", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return await response.json();
  }

  async createGroup(token, group) {
    const usersResp = await fetch(EXPENSES_API_BASE + "/groups", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify(group),
    });
    const groupJSON = await usersResp.json();
    return groupJSON.result;
  }

  async getGroupsByUserId(id, token) {
    const response = await fetch(EXPENSES_API_BASE + "/groups/byUser/" + id, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return await response.json();
  }

  async getGroupById(id, token) {
    const response = await fetch(EXPENSES_API_BASE + "/groups/" + id, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return await response.json();
  }

  async updateGroupById(id, token, body) {
    const updateResp = await fetch(`${EXPENSES_API_BASE}/groups/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(body),
    });
    return await updateResp.json();
  }

  async inviteUserToGroup(userId, groupId, token) {
    const response = await fetch(`${EXPENSES_API_BASE}/invites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        groupId,
        userId,
      }),
    });
    return await response.json();
  }

  async getAllInvites(id, token) {
    const response = await fetch(`${EXPENSES_API_BASE}/invites/${id}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const invites = await response.json();
    for (let index = 0; index < invites.length; index++) {
      const invite = invites[index];
      const from = await this.findUserById(invite.from, token);
      const group = await this.getGroupById(invite.group, token);
      invite.from = from;
      invite.group = group;
    }
    return invites;
  }

  async handleInvite(invite, token, isAccepted) {
    const inviteResp = await fetch(
      `${EXPENSES_API_BASE}/invites/${invite._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          state: isAccepted ? "Accepted" : "Declined",
        }),
      }
    );
    const json = await inviteResp.json();
    if (json.state === "Accepted") {
      let newParticipents = [];
      for (let index = 0; index < invite.group.participents.length; index++) {
        const element = invite.group.participents[index];
        newParticipents.push(element)
      }
      newParticipents.push(invite.to);
      await this.updateGroupById(invite.group._id, token, {participents: newParticipents});
    }
    return json;
  }

  //KICKSTARTERS
  async getAllKickstarters() {
    const response = await fetch(`${EXPENSES_API_BASE}/kickstarters`, {
      method: "GET"
    });
    return await response.json();
  }

  async getKickstarterById(id) {
    const response = await fetch(`${EXPENSES_API_BASE}/kickstarters/${id}`, {
      method: "GET"
    });
    return await response.json();
  }

  async createKickstarter(token, kickstarter) {
    const usersResp = await fetch(`${EXPENSES_API_BASE}/kickstarters`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify(kickstarter),
    });
    return await usersResp.json();
  }

  async updateKickstarter(id, token, kickstarter) {
    const usersResp = await fetch(`${EXPENSES_API_BASE}/kickstarters/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify(kickstarter),
    });
    return await usersResp.json();
  }

  async deleteKickstarter(id, token) {
    const usersResp = await fetch(`${EXPENSES_API_BASE}/kickstarters/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token
      },
    });
    return await usersResp.json();
  }
}

export default new ExpensesAPI();
