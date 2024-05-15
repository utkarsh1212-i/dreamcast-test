import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecords, deleteRecord, updateRecord, addRecord } from '../actions/recordActions';

const UsersTable = () => {
    const dispatch = useDispatch();
    const records = useSelector(state => state.records.records);
    const [editedRecord, setEditedRecord] = useState(records)
    const loading = useSelector(state => state.records.loading);
    const [editingRecordId, setEditingRecordId] = useState(null);
    const [newRecord, setNewRecord] = useState({
        name: '',
        email: '',
        phone: '',
        address: {
            city: '',
            zipcode: ''
        }
    });

    useEffect(() => {

        dispatch(fetchRecords());
    }, [dispatch]);


    const handleAddRecord = () => {
        dispatch(addRecord(newRecord))
            .then(() => {
                // Optionally, you can clear the form fields after adding the record
                setNewRecord({
                    name: '',
                    email: '',
                    phone: '',
                    address: {
                        city: '',
                        zipcode: ''
                    }
                });
            })
            .catch(error => console.error('Error adding record:', error));
    };

    const handleNewRecordChange = (e) => {
        const { name, value } = e.target;
        setNewRecord(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEdit = (id) => {
        setEditingRecordId(id);
    };

    const handleEditChange = (recordId, field, value) => {
        // const updatedRecord = { ...record, [field]: value };
        // setEditingRecordId(updatedRecord);
        const selectedRecord = records.filter(record => record.id === recordId);

        const updatedRecord = { ...selectedRecord[0], [field]: value };
        console.log(updatedRecord)
        setEditedRecord(updatedRecord);
        // Remove the input box after the value is changed
        // setEditingRecordId(null);
    };

    const handleEditSave = (record) => {
        // setEditingRecordId(null)
        dispatch(updateRecord(record))
            .then(() => setEditingRecordId(null))
            .catch(error => console.error('Error updating record:', error));
        setEditedRecord(null)
    };

    const handleDelete = (id) => {
        dispatch(deleteRecord(id));
        setEditedRecord(null)
    };

    const tableRows = useMemo(() => {
        return records.map((record) => (
            <tr key={record.id}>
                <td>{record.id}</td>
                <td>
                    {editingRecordId === record.id ?
                        <input
                            type="text"
                            defaultValue={record.name}
                            // value={editedRecord.name}
                            onChange={(e) => handleEditChange(record.id, 'name', e.target.value)}
                        />
                        : record.name}
                </td>
                <td>
                    {editingRecordId === record.id ?
                        <input
                            type="email"
                            defaultValue={record.email}
                            // value={editedRecord.email}
                            onChange={(e) => handleEditChange(record.id, 'email', e.target.value)}
                        />
                        : record.email}
                </td>
                <td>
                    {editingRecordId === record.id ?
                        <input
                            type="text"
                            defaultValue={record.phone}
                            // value={editedRecord.phone}
                            onChange={(e) => handleEditChange(record.id, 'phone', e.target.value)}
                        />
                        : record.phone}
                </td>
                <td>{record?.address?.city}, {record?.address?.zipcode}</td>
                <td>
                    {editingRecordId === record.id ?
                        <>
                            <button type="button" className="btn btn-success" onClick={() => handleEditSave(editedRecord)}>Save</button>
                            <button type="button" className="btn btn-secondary" onClick={() => setEditingRecordId(null)}>Cancel</button>
                        </>
                        :
                        <>
                            <button type="button" className="btn btn-light" onClick={() => handleEdit(record.id)}>Edit</button>
                            <button type="button" className="btn btn-danger" onClick={() => handleDelete(record.id)}>Delete</button>
                        </>
                    }
                </td>
            </tr>
        ));
    }, [records, editedRecord, editingRecordId])

    return (
        <div className='m-4'>
            {loading ? <p>Loading...</p> :
                <>
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>City with Zip Code</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>{tableRows}</tbody>
                    </table>
                    <div className="mt-4">
                        <h2>Add New Record</h2>
                        <div className="d-flex">
                            <input type="text" className="form-control mr-2" name="name" placeholder="Name" value={newRecord.name} onChange={handleNewRecordChange} />
                            <input type="email" className="form-control mr-2" name="email" placeholder="Email" value={newRecord.email} onChange={handleNewRecordChange} />
                            <input type="text" className="form-control mr-2" name="phone" placeholder="Phone" value={newRecord.phone} onChange={handleNewRecordChange} />
                            <input type="text" className="form-control mr-2" name="city" placeholder="City" value={newRecord.address.city} onChange={(e) => setNewRecord(prevState => ({ ...prevState, address: { ...prevState.address, city: e.target.value } }))} />
                            <input type="text" className="form-control mr-2" name="zipcode" placeholder="Zipcode" value={newRecord.address.zipcode} onChange={(e) => setNewRecord(prevState => ({ ...prevState, address: { ...prevState.address, zipcode: e.target.value } }))} />
                            <button type="button" className="btn btn-primary" onClick={handleAddRecord}>Add Record</button>
                        </div>
                    </div>
                </>
            }
        </div>
    );
};

export default UsersTable;
