import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card, Toast } from 'react-bootstrap';

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const navigate = useNavigate();

  // Check if the user is already logged in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      navigate('/'); // Redirect logged-in users to home
    }
  }, [navigate]);

  const adminEmail = 'admin@example.com';
  const adminPassword = 'admin123';

  const handleLogin = () => {
    setValidationErrors({});
    setErrorMessage('');

    if (email === '') {
      setValidationErrors((prev) => ({ ...prev, email: 'Email is required!' }));
      return;
    }
    if (password === '') {
      setValidationErrors((prev) => ({ ...prev, password: 'Password is required!' }));
      return;
    }

    if (email === adminEmail && password === adminPassword) {
      const admin = { id: 1, username: 'AdminUser', email: adminEmail, role: 'admin' };
      localStorage.setItem('user', JSON.stringify(admin));
      setToastMessage(`Welcome, ${admin.username}! You are now logged in.`);
      setShowToast(true);
      navigate('/admin'); // Redirect to admin dashboard
    } else {
      // Check if user is a member
      fetch('http://localhost:3001/members')
        .then((response) => response.json())
        .then((data) => {
          const member = data.find((m) => m.email === email && m.password === password);
          if (member) {
            localStorage.setItem('user', JSON.stringify(member)); // Store user info in localStorage
            setToastMessage(`Welcome, ${member.username}! You are now logged in.`);
            setShowToast(true);
            navigate('/'); // Redirect to home
          } else {
            setErrorMessage('Invalid email or password!');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };

  const handleRegister = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{10}$/;
    const errors = {};

    if (!username) {
      errors.username = 'Username is required!';
    } else if (username.length < 5 || username.length > 15) {
      errors.username = 'Username must be between 5 and 15 characters!';
    }

    if (!email) {
      errors.email = 'Email is required!';
    } else if (!emailPattern.test(email)) {
      errors.email = 'Please enter a valid email address!';
    }

    if (!phone) {
      errors.phone = 'Phone number is required!';
    } else if (!phonePattern.test(phone)) {
      errors.phone = 'Phone number must be 10 digits!';
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    // Check if email already exists in admin or members
    fetch('http://localhost:3001/members')
      .then((response) => response.json())
      .then((data) => {
        const existingMember = data.find((m) => m.email === email);
        const existingAdmin = adminEmail === email;

        if (existingMember || existingAdmin) {
          setValidationErrors((prev) => ({
            ...prev,
            email: 'This email is already in use! Please login instead.',
          }));
          return; // Prevent further execution if email already exists
        }

        // Proceed with registration
        fetch('http://localhost:3001/members', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            email,
            phone,
            password,
          }),
        })
          .then((response) => response.json())
          .then(() => {
            setToastMessage(`Registration successful! You can now log in with your email.`);
            setShowToast(true);
            setIsLogin(true); // Switch to login mode
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user data from local storage
    setIsLogin(true); // Set the component back to login state
    navigate('/login'); // Redirect to login page
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="w-100">
        <Col md={{ span: 6, offset: 3 }}>
          <Card className="p-4">
            <h2 className="text-center mb-4">{isLogin ? 'Login' : 'Register'}</h2>

            {errorMessage && <p className="text-danger">{errorMessage}</p>}

            {isLogin ? (
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    isInvalid={!!validationErrors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {validationErrors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    isInvalid={!!validationErrors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {validationErrors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" onClick={handleLogin} className="w-100">
                  Login
                </Button>

                <div className="text-center mt-3">
                  <p>Or continue as <Link to="/">Anonymous</Link></p>
                </div>

                <p className="mt-3 text-center">
                  Don't have an account?{' '}
                  <span onClick={() => setIsLogin(false)} style={{ cursor: 'pointer', color: 'blue' }}>
                    Register
                  </span>
                </p>
              </Form>
            ) : (
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Username (5-15 characters)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    isInvalid={!!validationErrors.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    {validationErrors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    isInvalid={!!validationErrors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {validationErrors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Phone (10 digits)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    isInvalid={!!validationErrors.phone}
                  />
                  <Form.Control.Feedback type="invalid">
                    {validationErrors.phone}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Button variant="primary" onClick={handleRegister} className="w-100">
                  Register
                </Button>

                <div className="text-center mt-3">
                  <p>Or continue as <Link to="/">Anonymous</Link></p>
                </div>

                <p className="mt-3 text-center">
                  Already have an account?{' '}
                  <span onClick={() => setIsLogin(true)} style={{ cursor: 'pointer', color: 'blue' }}>
                    Login
                  </span>
                </p>
              </Form>
            )}
          </Card>
        </Col>
      </Row>

      {/* Toast Notification */}
      <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </Container>
  );
};

export default LoginRegister;
