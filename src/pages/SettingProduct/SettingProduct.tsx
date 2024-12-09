import React, {useEffect, useState} from "react";
import s from "./setting.product.module.scss"
import {Link, useParams} from "react-router-dom";
import {Btn} from "../../shared/btn/Btn";
import {Loading} from "../Loading/Loading";
import {useCustomDispatch, useCustomSelector} from "../../hooks/store";
import {selectorAddProductData, selectorCurrentData, selectorOneProductData} from "../../store/selectors";
import {fetchAddProduct} from "../../store/thunks/fetchAddProduct";
import {fetchOneProduct} from "../../store/thunks/fetchOneProduct";
import {
    fetchUpdateCountProduct,
    fetchUpdateNameProduct,
    fetchUpdatePriceProduct,
    fetchUpdateCategoryProduct
} from "../../store/thunks/fetchUpdateProduct";

interface Props {

}

export const SettingProduct = (props: Props) => {
    const dispatch = useCustomDispatch()
    const {product} = useCustomSelector(
        selectorOneProductData
    )
    const {id} = useParams()
    const [file, setFile] = useState(null);
    const {user} = useCustomSelector(selectorCurrentData)
    const [data, setData] = useState({
        name: product.name,
        category: product.category,
        price: product.price,
        count: product.count
    });
    useEffect(() => {
        dispatch(fetchOneProduct(id))
    }, [])


    const [isLoad, setIsLoad] = useState(false)

    const handleFileChange = async (event) => {
        setFile(event.target.files[0]);
    };

    const loadedData = (data) => {
        setIsLoad(false)
    }

    const handleUpload = async () => {
        setIsLoad(true)
        const formData = {
            id: product.id,
            name: data.name,
            category: data.category,
            count: data.count,
            price: data.price
        }
        try {
            if (formData.name != product.name) {
                dispatch(fetchUpdateNameProduct(formData))
                console.log(formData)
            }
            if (formData.category != product.category) {
                dispatch(fetchUpdateCategoryProduct(formData))
            }
            if (formData.count != product.count) {
                //dispatch(fetchUpdateCountProduct(formData))
            }
            if (formData.price != product.price) {
                dispatch(fetchUpdatePriceProduct(formData))
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div className="row">
                {!isLoad &&
                    <div className="col-12">
                        <div>
                            <Link to={"/settings"}>
                                <Btn>
                                    Перейти в настройки
                                </Btn>
                            </Link>
                        </div>
                        <div className="form-group">
                            <label/>
                            <input
                                onChange={(e) => setData({...data, name: e.target.value})}
                                value={data.name}
                                type="text" className="form-control" name="" aria-describedby="helpId"/>
                            <small className={s.txt + " form-text"}>Имя товара</small>
                        </div>
                        <div className="form-group">
                            <label/>
                            <input
                                value={data.count}
                                onChange={(e) => setData({...data, count: e.target.value})}
                                type="text" className="form-control" name="" aria-describedby="helpId"/>
                            <small className={s.txt + " form-text"}>Количество</small>
                        </div>
                        <div className="form-group">
                            <label/>
                            <input
                                value={data.category}
                                onChange={(e) => setData({...data, category: e.target.value})} type="text" className="form-control" name="" aria-describedby="helpId"/>
                            <small className={s.txt + " form-text"}>Категория</small>
                        </div>
                        <div className="form-group">
                            <label/>
                            <input value={data.price} onChange={(e) => setData({...data, price: e.target.value})} type="text" className="form-control" name="" aria-describedby="helpId"/>
                            <small className={s.txt + " form-text"}>Цена</small>
                        </div>
                        <div className="col-12 text-end mt-4">
                            <Btn onClick={() => handleUpload()}>Сохранить изменения</Btn>
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