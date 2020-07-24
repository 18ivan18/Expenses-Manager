import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth } from "../../features/users/AuthSlice.js";
import { changeLoading } from "../../features/loading/loadingSlice";
import {
  selectMessage,
  postNewIncome,
  clearMessage,
} from "../../features/Payments/BalanceSlice";

export const BalanceChange = ({
  expense,
  date,
  category,
  cb,
  userID,
  categoryPicture,
  postTwice,
  secondID,
}) => {
  const dis = useDispatch();
  const auth = useSelector(selectAuth);
  const message = useSelector(selectMessage);
  const incomesCategorys = useSelector((state) => state.balance.categorys);
  const paymentsCategorys = useSelector(
    (state) => state.balance.paymentsCategories
  );
  const categorys = expense ? paymentsCategorys : incomesCategorys;

  const initialState = {
    amount: 0,
    description: "",
    category: category ? category : "",
    newCategory: "",
    newCategoryPicture: "",
  };

  useEffect(() => {
    const M = window.M;
    const elems = document.querySelectorAll("select");
    M.FormSelect.init(elems, {});
    dis(clearMessage());
  }, [categorys]);

  useEffect(() => {
    setFormData({ ...formData, category: category });
  }, [category]);

  const handleSubmit = async () => {
    dis(changeLoading());
    if (postTwice) {
      await dis(
        postNewIncome({
          auth,
          formData,
          expense: !expense,
          date,
          secondID,
          category: category
            ? category
            : formData.category
            ? formData.category
            : formData.newCategory,
          categoryPicture: categoryPicture
            ? categoryPicture
            : formData.category
            ? categorys.filter((c) => c.name === formData.category)[0].picture
            : formData.newCategoryPicture,
        })
      );
    }
    await dis(
      postNewIncome({
        auth,
        formData,
        expense,
        date,
        userID,
        category: category
          ? category
          : formData.category
          ? formData.category
          : formData.newCategory,
        categoryPicture: categoryPicture
          ? categoryPicture
          : formData.category
          ? categorys.filter((c) => c.name === formData.category)[0].picture
          : formData.newCategoryPicture,
      })
    );
    dis(changeLoading());

    setFormData(initialState);
    if (cb) {
      cb();
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const [formData, setFormData] = useState(initialState);

  return (
    <React.Fragment>
      {message && <div>{message}</div>}
      <div className="modal-content" style={{ minHeight: "600px" }}>
        <form>
          <input
            placeholder="0"
            id="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
          />
          <label htmlFor="amount">Amount</label>
          {!category && (
            <div className="input-field col s12">
              {!formData.newCategory && !formData.newCategoryPicture && (
                <div>
                  <select
                    value={formData.category}
                    id="category"
                    onChange={handleChange}
                  >
                    <option value="">Choose your category</option>
                    {categorys &&
                      categorys.map((c) => (
                        <option data-icon={c.picture} key={c.name}>
                          {c.name}
                        </option>
                      ))}
                  </select>
                  <label>Category</label>
                </div>
              )}

              {!formData.category && (
                <div>
                  <input
                    placeholder="New category"
                    id="newCategory"
                    value={formData.newCategory}
                    onChange={handleChange}
                  />
                  <label>New category</label>
                  <input
                    placeholder="New category picture"
                    id="newCategoryPicture"
                    value={formData.newCategoryPicture}
                    onChange={handleChange}
                  />
                  <label>New category picture</label>
                </div>
              )}
            </div>
          )}
          <textarea
            id="description"
            className="materialize-textarea"
            value={formData.description}
            onChange={handleChange}
            placeholder="Notes"
          ></textarea>
          <label htmlFor="description">Notes</label>
        </form>
      </div>
      <div className="modal-footer">
        <a className="modal-close waves-effect waves-green btn-flat">Close</a>
        <a className="waves-effect waves-green btn-flat" onClick={handleSubmit}>
          Add
        </a>
      </div>
    </React.Fragment>
  );
};

export default BalanceChange;
