import { ContactListItem } from 'components/ContactListItem/ContactListItem';
import css from './ContactsList.module.css';

export const ContactList = ({ contactsArr, deleteContact }) => {
  return (
    <ul className={css.contactsList}>
      {contactsArr.map(contact => {
        const { id, name, number } = contact;
        return (
          <ContactListItem
            key={id}
            contactId={id}
            contactName={name}
            contactNumber={number}
            deleteContact={deleteContact}
          />
        );
      })}
    </ul>
  );
};
