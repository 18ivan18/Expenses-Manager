import React, { useEffect, useState } from "react";
import { fetchUserById } from "../../features/users/UsersSlice";
import { useDispatch, useSelector } from "react-redux";

export default function BalanceCard({ balance, showCategory }) {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [user, setUser] = useState(undefined);

  useEffect(() => {
    dispatch(
      fetchUserById({ id: balance.userID, token: auth.token })
    ).then((res) => setUser(res.payload));
  }, [balance]);

  return (
    (user && (
      <div>
        <div className="col s12 z-depth-1" style={{ border: "1px solid #EEE", backgroundColor: balance ? "#ffcccb" : "#90EE90" }}>
          <div className="row" style={{ borderBottom: "2px dotted black" }}>
            {!showCategory ? (
              <div>
                <img
                  className="responsive-img circle"
                  style={{
                    width: "60px",
                    height: "60px",
                    verticalAlign: "middle",
                    margin: 15,
                    marginTop: 50,
                  }}
                  src={user.profilePicture}
                />
                <span style={{ fontSize: "30px"}}>
                  {user.name}
                </span>{" "}
                <span
                  style={{
                    float: "right",
                    marginTop: "20px"
                  }}
                >
                  ${balance.amount}
                </span>
              </div>
            ) : (
              <div>
                <img
                  className="responsive-img circle"
                  style={{
                    width: "60px",
                    height: "60px",
                    verticalAlign: "middle",
                    margin: 15,
                    marginTop: 50,
                  }}
                  src={balance.categoryPicture}
                />
                <span style={{ fontSize: "30px", verticalAlign: "middle" }}>
                  {balance.category}
                </span>

                <span
                  style={{
                    marginTop: "50px",
                    float: "right",
                  }}
                >
                  ${balance.amount}
                </span>
              </div>
            )}
          </div>

          <div>
            <p style={{ margin: 0 }}>Notes:</p>
            <p style={{ margin: 0 }}>{balance.description}</p>
          </div>
        </div>
      </div>
    )) ||
    null
  );
}
