import React from 'react';
import PropTypes from 'prop-types';
import styles from './ContactList.module.css';
import stylesApp from '../../components/App.module.css';

const ContactList = ({ contacts, handleDelete }) => {
  return (
    <div className={styles.listAbonent}>
      {contacts.map(({ name, number, id }, index) => (
        <li className={styles.item_contact} key={index}>
          <div className={styles.text_contact}>
            <span>{name} </span>
            <span className={styles.accent_text}>{number}</span>
          </div>
          <button
            type="button"
            className={stylesApp.btn}
            onClick={() => handleDelete(id)}
          >
            delete
          </button>
        </li>
      ))}
    </div>
  );
};
export default ContactList;

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  handleDelete: PropTypes.func.isRequired,
};
