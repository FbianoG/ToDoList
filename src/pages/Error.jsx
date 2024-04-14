import "./Error.css"

export default function Error() {

    return (
        <div className="errorContainer">
            <div className="imageError">
                <img src="../../public/img/undraw_cancel_re_pkdm.svg" alt="Image error" />
            </div>
            <h1>Ocorreu algum erro</h1>
            <a href='/' >Volte a pagina inial</a>
        </div>

    )
}

