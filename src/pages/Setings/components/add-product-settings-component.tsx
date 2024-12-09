import React, {useEffect, useState} from "react";
import s from "./stylesCompSettings.module.scss"
import {useCustomDispatch, useCustomSelector} from "../../../hooks/store";
import {selectorAddProductData, selectorCurrentData} from "../../../store/selectors";
import {fetchAddProduct} from "../../../store/thunks/fetchAddProduct";
import {Loading} from "../../Loading/Loading";
import {Btn} from "../../../shared/btn/Btn";

interface Props {

}

export const AddProductSettingsComponent = (props: Props) => {
    const dispatch = useCustomDispatch()
    const [file, setFile] = useState(null);

    const [data, setData] = useState({
        name: "",
        price: "",
        count: "",
        desc: "",
        category: ""
    });
    const {product} = useCustomSelector(
        selectorAddProductData
    )
    const [isLoad, setIsLoad] = useState(false)

    const handleFileChange = async (event) => {
        setFile(event.target.files[0]);
    };

    const loadedData = (data) => {
        setIsLoad(false)
    }

    const handleUpload = async () => {
        setIsLoad(true)
        const formData = new FormData()
        formData.append('image', file);
        formData.append('name', data.name);
        formData.append('price', data.price);
        formData.append('count', data.count);
        formData.append('desc', data.desc);
        formData.append('category', data.category);
        try {
            dispatch(fetchAddProduct(formData))
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div className="row mb-1">
                {!isLoad &&
                    <div className="col-12">
                        <div className="form-group">
                            <label/>
                            <input onChange={(e) => setData({...data, name: e.target.value})} type="text" className="form-control" name="" aria-describedby="helpId"/>
                            <small className={s.txt + " form-text"}>Название</small>
                        </div>
                        <div className="form-group">
                            <label/>
                            {/*<textarea onChange={(e) => setData({...data, desc: e.target.value})} className="form-control" rows="3"/>*/}
                            <input onChange={(e) => setData({...data, desc: e.target.value})} type="text" className="form-control" name="" aria-describedby="helpId"/>
                            <small className={s.txt + " form-text"}>Описание</small>
                        </div>
                        <div className="form-group mb-5">
                            <label/>
                            <input onChange={(e) => setData({...data, price: e.target.value})} type="number" className="form-control" name="" aria-describedby="helpId"/>
                            <small className={s.txt + " form-text"}>Цена</small>
                        </div>
                        <div className="form-group mb-5">
                            <label/>
                            <input onChange={(e) => setData({...data, category: e.target.value})} type="text" className="form-control" name="" aria-describedby="helpId"/>
                            <small className={s.txt + " form-text"}>Категория</small>
                        </div>
                        <div className="form-group mb-5">
                            <label/>
                            <input onChange={(e) => setData({...data, count: e.target.value})} type="number" className="form-control" name="" aria-describedby="helpId"/>
                            <small className={s.txt + " form-text"}>Количество</small>
                        </div>
                        <div className="form-group">
                            <label/>
                            <input onChange={handleFileChange} type="file" id="img_form"
                                   accept="image/*"
                                   className={s.inp_f + " form-control-file"} name="img"
                                   placeholder="выберите фотографию товара" aria-describedby="fileHelpId"/>
                            <small className={s.txt + " form-text"}>фото товара</small>
                        </div>
                        <div className="col-12 text-end mt-4">
                            <Btn onClick={() => handleUpload()}>Добавить</Btn>
                        </div>
                    </div>
                }
                {isLoad &&
                    <Loading
                        state={loadedData}
                        status={"addProduct"}
                        body={data}
                        />
                }
            </div>
        </>
    );
}