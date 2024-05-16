import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Pagination, Button, Modal, Form } from 'react-bootstrap';

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: ''
  });

  const loadFeedbacks = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(process.env.REACT_APP_API_URL +'/api/feedback', {
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${token}`
            }
          });
          setFeedbacks(response.data.data);
      
    } catch (error) {
      console.error('Error loading feedbacks:', error);
    }
  };

  useEffect(() => {
    loadFeedbacks();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentFeedbacks = feedbacks.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(feedbacks.length / itemsPerPage);

  const renderPaginationItems = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
    return pageNumbers;
  };

  const handleFormChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Perform form submission or API call to submit the feedback
    console.log(formData);
    // Reset the form data
    setFormData({
      title: '',
      description: '',
      category: ''
    });
    
    setShowModal(false);
  };

  const getCategoryText = (categoryValue) => {
    console.log(categoryValue);
    switch (categoryValue) {
      case '1':
        return 'Bug Report';
      case '2':
        return 'Feature Request';
      case '3':
        return 'Improvement,';
      default:
        return '';
    }}

  return (
    <div className="container mt-5">
      <h2>Feedback</h2>

      <h4 className="mt-5">Feedback List</h4>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Submit Feedback
      </Button>
      <Table responsive>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {currentFeedbacks.map((feedback) => (
            <tr key={feedback.id}>
              <td>{feedback.id}</td>
              <td>{feedback.title}</td>
              <td>{feedback.description}</td>
              <td>{getCategoryText(feedback.category)}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        <Pagination.First
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        />
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {renderPaginationItems()}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
        <Pagination.Last
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        />
      </Pagination>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Submit Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={formData.category}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default FeedbackList;