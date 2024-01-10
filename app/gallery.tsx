"use client";

import { useEffect, useState } from "react";
import Avatar from "boring-avatars";
import {
  FaRegCircleXmark,
  FaLocationDot,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa6";

import Controls, { SelectItem, SortDirection, SortField } from "./controls";
import Modal from "./modal";

import { User } from "./types/user";
import { SingleValue } from "react-select";

export type GalleryProps = {
  users: User[];
};
const Gallery = ({ users }: GalleryProps) => {
  const [usersList, setUsersList] = useState(users);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [sortField, setSortField] = useState<SortField>();
  const [sortDirection, setSortDirection] = useState<SortDirection>();

  const handleSortFieldChange = (item: SingleValue<SelectItem>) => {
    setSortField(item?.value as SortField);
  }

  const handleSortDirectionChange = (item: SingleValue<SelectItem>) => {
    setSortDirection(item?.value as SortDirection);
  }

  useEffect(() => {
    // Do not sort if there's no sort field selected
    if (sortField === undefined)
      return

    const newUsersList = [...users];
    newUsersList.sort((userA, userB) => {
      let fieldA, fieldB;
      if (sortField === 'company') {
        // ignore upper and lowercase
        fieldA = userA[sortField].name.toUpperCase();
        fieldB = userB[sortField].name.toUpperCase();
      }
      else {
        // ignore upper and lowercase
        fieldA = userA[sortField].toUpperCase();
        fieldB = userB[sortField].toUpperCase();
      }
      if (fieldA > fieldB)
        // Default to 'ascending' if sort direction is not set
        return sortDirection !== 'descending' ? 1 : -1
      else if (fieldA < fieldB)
        // Default to 'ascending' if sort direction is not set
        return sortDirection !== 'descending' ? -1 : 1
      return 0
    })
    setUsersList(newUsersList);
  }, [users, sortField, sortDirection])

  const handleModalOpen = (id: number) => {
    const user = usersList.find((item) => item.id === id) || null;

    if (user) {
      setSelectedUser(user);
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  return (
    <div className="user-gallery">
      <div className="heading">
        <h1 className="title">Users</h1>
        <Controls 
          onSortFieldChange={handleSortFieldChange}
          onSortDirectionChange={handleSortDirectionChange}
        />
      </div>
      <div className="items">
        {usersList.map((user, index) => (
          <div
            className="item user-card"
            key={index}
            onClick={() => handleModalOpen(user.id)}
          >
            <div className="body">
              <Avatar
                size={96}
                name={user.name}
                variant="marble"
                colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
              />
            </div>
            <div className="info">
              <div className="name">{user.name}</div>
              <div className="company">{user.company.name}</div>
            </div>
          </div>
        ))}
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          <div className="user-panel">
            <div className="header">
              <div
                role="button"
                tabIndex={0}
                className="close"
                onClick={handleModalClose}
              >
                <FaRegCircleXmark size={32} />
              </div>
            </div>
            <div className="body">
              {selectedUser && (
                <div className="user-info info">
                  <div className="avatar">
                    <Avatar
                      size={240}
                      name={selectedUser.name}
                      variant="marble"
                      colors={[
                        "#92A1C6",
                        "#146A7C",
                        "#F0AB3D",
                        "#C271B4",
                        "#C20D90",
                      ]}
                    />
                  </div>
                  <div className="name">
                    {selectedUser.name} ({selectedUser.username})
                  </div>
                  <div className="field">
                    <FaLocationDot className="icon" />
                    <div className="data">{`${selectedUser.address.street}, ${selectedUser.address.suite}, ${selectedUser.address.city}`}</div>
                  </div>
                  <div className="field">
                    <FaPhone className="icon" />
                    <div className="value">{selectedUser.phone}</div>
                  </div>
                  <div className="fields">
                    <FaEnvelope className="icon" />
                    <div className="value">{selectedUser.email}</div>
                  </div>
                  <div className="company">
                    <div className="name">{selectedUser.company.name}</div>
                    <div className="catchphrase">
                      {selectedUser.company.catchPhrase}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Gallery;
