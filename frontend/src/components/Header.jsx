import { useNavigate } from 'react-router-dom'
import { Badge, Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import logo from '../assets/logo.png'
import { logout } from '../slices/authSlice'
import { useLogoutMutation } from '../slices/userApiSlice'
export const Header = () => {
    const { cartItems } = useSelector((state) => state.cart)
    const { userInfo } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [logoutcall] = useLogoutMutation()

    const logoutHandler = async () => {
        try {
            await logoutcall().unwrap()
            dispatch(logout())
            navigate('/')
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <header>
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand >
                            <img src={logo} alt="" />
                            Online Shopping
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto'>
                            <LinkContainer to='/cart'>
                                <Nav.Link>
                                    <FaShoppingCart />
                                    Cart
                                    {cartItems.length > 0 && (<Badge pill bg='success' style={{ marginLeft: '5px' }}>
                                        {cartItems.reduce((pre, current) => pre + Number(current.qty), 0)}

                                    </Badge>)}
                                </Nav.Link>
                            </LinkContainer>
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item> Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            ) : (<LinkContainer to='/login'>
                                <Nav.Link >
                                    <FaUser />
                                    Sign In
                                </Nav.Link>
                            </LinkContainer>)}

                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin Operations' id='Admin'>
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item> Users List </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item> Orders List </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/productlist/1'>
                                        <NavDropdown.Item> Products List </NavDropdown.Item>
                                    </LinkContainer>

                                </NavDropdown>
                            )}
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}
