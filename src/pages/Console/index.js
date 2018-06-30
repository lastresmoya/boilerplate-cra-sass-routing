import React, { PureComponent } from 'react';
import axios from 'axios';
import { Row, Grid, Col, Button } from 'react-bootstrap';
import { ActionCable } from 'react-actioncable-provider';

import { Calendar, Notes, NewMatterModal, ControlPanel } from '../../components';

class Console extends PureComponent {

    constructor(props) {
      super(props);
      this.state = {
        mattersList: [],
        notesList: [],
        mattersListLoaded: false,
        notesListLoading: false,
        newNoteInput: '',
        selectedMatterId: null,
        newMatterModalShow: false,
        startAt: null,
        endAt: null,
        newMatterInput: ''
      }
    }

    componentWillMount() {
       this.fetchMattersList();
    }

    fetchMattersList() {
      axios.get(`${process.env.REACT_APP_V1_API_URL}/matters`)
        .then((resp) => {
            const data = resp.data.map(x => ({
                id: x.id,
                title: x.title,
                startAt: new Date(x.start_at),
                endAt: new Date(x.end_at),
            }))
            this.setState({
              mattersList: data,
              mattersListLoaded: true
            })
        })
        .catch((error) => {
            console.log(error);
        });
    }

    fetchNotesList(id) {
      this.setState({ notesListLoading: true })
      axios.get(`${process.env.REACT_APP_V1_API_URL}/matters/${id}/notes`)
        .then((resp) => {
            const data = resp.data.map(x => ({
                id: x.id,
                body: x.body,
            }))
            this.setState({
              notesList: data,
              notesListLoading: false,
              selectedMatterId: id,
            })
        })
        .catch((error) => {
            console.log(error);
        });
    }

    createMatter() {
      axios.post(`${process.env.REACT_APP_V1_API_URL}/matters`, {
        title: this.state.newMatterInput,
        start_at: this.state.startAt,
        end_at: this.state.endAt,
      })
        .then((resp) => {
          const data = {
              id: resp.data.id,
              title: resp.data.title,
              startAt: new Date(resp.data.start_at),
              endAt: new Date(resp.data.end_at),
          };
          this.setState({
            mattersList: this.state.mattersList.concat(data),
          })
          this.unloadNewMatterModal();
        })
        .catch((error) => {
            console.log(error);
        });
    }

    createNote() {
      axios.post(`${process.env.REACT_APP_V1_API_URL}/matters/${this.state.selectedMatterId}/notes`, {
        body: this.state.newNoteInput,
        matter_id: this.state.selectedMatterId,
      })
        .then((resp) => {
          const data = {id: resp.data.id, body: resp.data.body};
          this.setState({
            notesList: this.state.notesList.concat(data),
            newNoteInput: '',
          })
        })
        .catch((error) => {
            console.log(error);
        });
    }

    deleteMatterNote(id) {
      const strippedId = id.replace('delete_', '');
      axios.delete(`${process.env.REACT_APP_V1_API_URL}/matters/${this.state.selectedMatterId}/notes/${strippedId}`)
        .then((resp) => {
            const data = this.state.notesList.filter(x => ( x.id !== resp.data.id ))
            this.setState({
              notesList: data,
            })
        })
        .catch((error) => {
            console.log(error);
        });
    }

    deleteMatter(id) {
      axios.delete(`${process.env.REACT_APP_V1_API_URL}/matters/${this.state.selectedMatterId}`)
        .then((resp) => {
            const data = this.state.mattersList.filter(x => ( x.id !== resp.data.id ))
            this.setState({
              mattersList: data,
              selectedMatterId: null,
            })
        })
        .catch((error) => {
            console.log(error);
        });
    }

    initLoadReady() {
      return this.state.mattersListLoaded
    }

    handleSave() {
      this.createNote();
    }

    handleChange(e) {
      this.setState({
        [e.target.id]: e.target.value,
      })
    }

    selectMatter(e) {
      this.fetchNotesList(e.id);
    }

    selectSlot(e) {
      this.setState({
        newMatterModalShow: true,
        startAt: e.start,
        endAt: e.end,
      })
    }

    unloadNewMatterModal() {
      this.setState({
        newMatterModalShow: false,
        startAt: null,
        endAt: null,
        newMatterInput: ''
      })
    }

    handleReceivedMattersChannelBroadcast(response) {
      const data = {
        id: response.id,
        title: response.title,
        startAt: new Date(response.start_at),
        endAt: new Date(response.end_at),
    };
      this.setState({
        mattersList: this.state.mattersList.concat(data),
      })
    };
  

    render() {
      const { 
        mattersList,
        notesList,
        newNoteInput,
        notesListLoading,
        selectedMatterId,
        newMatterModalShow,
        startAt,
        endAt,
        newMatterInput
      } = this.state;
      return (
        <Grid>
          <ActionCable
            channel={{ channel: 'MattersChannel' }}
            onReceived={(response) => this.handleReceivedMattersChannelBroadcast(response)}
          />
          {this.initLoadReady() ?
            <Row>
              <Col sm={selectedMatterId ? 9 : 12}>
                <Calendar
                  events={mattersList}
                  handleSelectMatter={(e) => this.selectMatter(e)}
                  handleSelectSlot={(e) => this.selectSlot(e)}
                />
              </Col>
              <NewMatterModal
                show={newMatterModalShow}
                handleClose={() => this.unloadNewMatterModal()}
                startAt={startAt}
                endAt={endAt}
                handleChange={(e) => this.handleChange(e)}
                value={newMatterInput}
                handleSave={() => this.createMatter()}
              />
              {selectedMatterId &&
                <Col sm={3}>
                  <ControlPanel
                    handleClose={() => this.setState({ selectedMatterId: null})}
                  >
                  <Button onClick={() => this.deleteMatter()}>Delete Matter</Button>
                    <Notes
                      list={notesList}
                      handleSave={() => this.handleSave()}
                      handleChange={(e) => this.handleChange(e)}
                      value={newNoteInput}
                      notesListLoading={notesListLoading}
                      handleDelete={(e) => this.deleteMatterNote(e.target.id)}
                    />
                  </ControlPanel>
                </Col>
              }
            </Row>
            :
            <h1>Loading...</h1>
          }
        </Grid>
      )
    }
  }


export default Console;