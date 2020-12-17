import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listPaintings, savePaint, deletePaint } from '../actions/paintActions.js';

function PaintingsScreen(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [price, setPrice] = useState('');
    const [images, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [Qty, setQty] = useState('');
    const paintList = useSelector(state => state.paintList);
    const { loading, paintings, error } = paintList;


    const paintSave = useSelector(state => state.paintSave);
    
    const {
         loading: laodingSave,
          success: successSave,
           error: errorSave,
         } = paintSave;
         const paintDelete = useSelector(state => state.paintDelete); 
         const {
            loading: laodingDelete,
             success: successDelete,
              error: errorDelete,
            } = paintDelete;
    const dispatch = useDispatch();


    useEffect(() => {
        if(successSave){
            setModalVisible(false)
        }
        dispatch(listPaintings());
        return () => {
            //
        };
    }, [successSave, successDelete]);

    const openModal = (paint) => {
        setModalVisible(true);
        setId(paint._id);
        setName(paint.name);
        setPrice(paint.price);
        setImage(paint.images);
        setCategory(paint.category);
        setQty(paint.Qty);
        setDescription(paint.description);

    }




    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaint({
            _id: id,
            name, price, images, category, Qty, description
        }));


    };
    const deleteHandler = (paint) => {
        dispatch(deletePaint(paint._id))
    }

    return (
        <div className="content content-margined">
            <div className="product-header">
                <h3> Products</h3>
                <button className="button primary" onClick={() => openModal({})}>
                    Create New Products
        </button>
            </div>
            { modalVisible && (


                <div className="form">
                    <form onSubmit={submitHandler} >
                        <ul className="form-container">
                            <li>
                                <h2>Create a New Product</h2>
                            </li>
                            <li>
                                {laodingSave && <div> Loading...</div>}
                                {errorSave && <div> {errorSave}</div>}
                            </li>
                            {" "}
                            <li>
                                <label htmlFor="name">
                                    Name
          </label>
                                <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)}>
                                </input>
                            </li>
                            <li>
                                <label htmlFor="price">
                                    Price
          </label>
                                <input type="text" name="price" id="price" value={price} onChange={(e) => setPrice(e.target.value)}>
                                </input>
                            </li>
                            <li>
                                <label htmlFor="image">
                                    Image
          </label>
                                <input type="text" name="images" id="image" value={images} onChange={(e) => setImage(e.target.value)}>
                                </input>
                            </li>
                            <li>
                                <label htmlFor="category">
                                    Category
          </label>
                                <input type="text" name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                                </input>
                            </li>
                            <li>
                                <label htmlFor="posterQty">
                                    Qty
          </label>
                                <input type="text" name="posterQty" id="posterQty" value={Qty} onChange={(e) => setQty(e.target.value)}>
                                </input>
                            </li>
                            <li>
                                <label htmlFor="name">
                                    Description
          </label>
                                <textarea type="text" name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)}>
                                </textarea>
                            </li>
                            <li>
                                <button type="submit" className="button primary">{id ? "Update" : "Create"}</button>
                            </li>
                            <li>
                                <button type="button" className="button secondary" onClick={() => setModalVisible(false)}>Back</button>
                            </li>

                        </ul>
                    </form>
                </div>
            )}

            <div className="paint-list">

                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paintings.map(paint => (
                            <tr key={paint._id}>
                                <td>{paint._id}</td>
                                <td>{paint.name}</td>
                                <td>{paint.price}</td>
                                <td>{paint.category}</td>
                                <td>
                                    <button className="button" onClick={() => openModal(paint)}>Edit</button>
                                    {" "}
                                    <button className="button"  onClick={() => deleteHandler(paint)} >Delete</button>
                                </td>

                            </tr>
                        ))}



                    </tbody>
                </table>
            </div>



        </div>
    )
}
export default PaintingsScreen;