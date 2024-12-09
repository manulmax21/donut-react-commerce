import React, {useState} from "react";
import s from "./setting.profile.module.scss"
import {Btn} from "../../shared/btn/Btn";
import {Loading} from "../Loading/Loading";
import {useCustomDispatch, useCustomSelector} from "../../hooks/store";
import {selectorAddProductData, selectorCurrentData} from "../../store/selectors";
import {fetchAddProduct} from "../../store/thunks/fetchAddProduct";
import {Link} from "react-router-dom"
import {
    fetchUpdateCategoryProduct,
    fetchUpdateNameProduct,
    fetchUpdatePriceProduct
} from "../../store/thunks/fetchUpdateProduct";
import {fetchUpdateNameUser, fetchUpdatePasswordUser} from "../../store/thunks/fetchUpdateUser";

interface Props {

}

export const SettingProfile = (props: Props) => {
    const dispatch = useCustomDispatch()
    const [file, setFile] = useState(null);
    const {user} = useCustomSelector(selectorCurrentData)
    const [data, setData] = useState({
        name: user.name,
        password_old: "",
        password_new: "",
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
        const formData = {
            userId: user.id,
            name: data.name,
            oldPassword: data.password_old,
            newPassword: data.password_new
        }
        try {
            if (formData.name != user.name) {
                dispatch(fetchUpdateNameUser(formData))
                console.log(formData)
            }
            if (formData.newPassword.length > 1) {
                dispatch(fetchUpdatePasswordUser(formData))
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
                            <small className={s.txt + " form-text"}>Имя</small>
                        </div>
                        <div className="form-group">
                            <label/>
                            <input onChange={(e) => setData({...data, password_old: e.target.value})} type="text" className="form-control" name="" aria-describedby="helpId"/>
                            <small className={s.txt + " form-text"}>Старый пароль</small>
                        </div>
                        <div className="form-group">
                            <label/>
                            <input onChange={(e) => setData({...data, password_new: e.target.value})} type="text" className="form-control" name="" aria-describedby="helpId"/>
                            <small className={s.txt + " form-text"}>Новый пароль</small>
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