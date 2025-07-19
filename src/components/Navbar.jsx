export const Navbar = ({children}) => {
    return (
        <div className="header">
            <div className="header-content">
                <div className="logo">Goa Testing Agency</div>
                <div className="nav-buttons">
                    {children}
                </div>
            </div>
        </div>
    )
}
