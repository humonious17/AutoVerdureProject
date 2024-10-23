"use client";
import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { parse } from 'cookie';

const Profile = (props) => {
  const [formData, setFormData] = useState(props.user);
  const [buttonText, setButtonText] = useState('Update Profile');
  const [editField, setEditField] = useState({
    name: false,
    phone: false,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (field) => {
    setEditField({
      ...editField,
      [field]: !editField[field],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleEditProfile = async () => {
    setButtonText('Updating Profile...');
    const result = await fetch('/api/editProfile', {
      method: 'POST',
      body: JSON.stringify(formData),
    });

    if (result.ok) {
      setButtonText('Updated Profile');
      window.location.href = "/profile";
    } else {
      setButtonText('Update Profile');
    }
  };

  const styles = {
    body: { display: 'flex', justifyContent: 'center', marginTop: '5%', alignItems: 'center' },
    container: { display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100vh', fontFamily: 'Arial, sans-serif' },
    form: { padding: '20px', width: '560px', display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: 'auto' },
    label: { marginBottom: '8px', fontWeight: '400', fontSize: '24px' },
    labellast: { marginBottom: '8px', fontWeight: '400', fontSize: '24px', position: 'relative', left: '25px' },
    input: { width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '25px', fontSize: '14px' },
    inputHalf: { width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '25px', fontSize: '14px' },
    button: { width: '99%', padding: '10px 0', border: 'none', borderRadius: '25px', backgroundColor: '#9A5CF5', color: 'white', fontSize: '16px', cursor: 'pointer', marginTop: '10px' },
    editIcon: { position: 'relative', width: '40px', height: '40px', left: '10%' },
    editIcon2: { position: 'relative', width: '40px', height: '40px', left: '3%' },
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <label htmlFor="firstName" style={styles.label}>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              style={styles.inputHalf}
              disabled={!editField.name}
            />
          </div>
          <div>
            <label htmlFor="lastName" style={styles.labellast}>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              style={styles.inputHalf}
              disabled={!editField.name}
            />
          </div>
          <BiEdit style={styles.editIcon} onClick={() => handleEdit('name')} />
        </div>

        <label htmlFor="email" style={styles.label}>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} style={styles.input} disabled />

        <label htmlFor="phone" style={styles.label}>Phone</label>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} style={styles.input} disabled={!editField.phone} />
          <BiEdit style={styles.editIcon2} onClick={() => handleEdit('phone')} />
        </div>

        <label htmlFor="avPoints" style={styles.label}>AV Points</label>
        <input type="number" name="avPoints" value={formData.avPoints} onChange={handleChange} style={styles.input} disabled />

        <button type="submit" style={styles.button} onClick={handleEditProfile}>
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default Profile;

export async function getServerSideProps({ req, res }) {
  const { admin, db } = await import("/pages/api/firebaseAdmin");
  const cookies = req.headers.cookie;
  if (cookies) {
    const tokens = parse(req.headers.cookie);
    const sessionToken = tokens.sessionToken;

    if (sessionToken) {
      const usersRef = db.collection('users');
      const querySnapshot = await usersRef.where('sessionToken', '==', sessionToken).get();

      const users = [];
      querySnapshot.forEach(doc => {
        users.push({ id: doc.id, ...doc.data() });
      });

      const user = users[0];
      if (!user) {
        return {
          redirect: {
            destination: '/signin',
            permanent: false,
          },
        };
      }

      const parsedUser = {
        firstName: user.username.split(' ')[0],
        lastName: user.username.split(' ')[1],
        email: user.email,
        phone: user.phone,
        avPoints: user.avPoints || 0,
      };

      return {
        props: { user: parsedUser },
      };
    } else {
      return {
        redirect: {
          destination: '/signin',
          permanent: false,
        },
      };
    }
  } else {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }
}
