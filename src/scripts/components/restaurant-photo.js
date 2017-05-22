import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

export default class RestaurantFilePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accept: 'image/png, image/jpeg, image/gif',
            dropzoneActive: false
        };
        this.onDrop = this.onDrop.bind(this);
        this.onDragEnter = this.onDragEnter.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
    }

    onDragEnter() {
        this.setState({
            dropzoneActive: true
        });
    }

    onDragLeave() {
        this.setState({
            dropzoneActive: false
        });
    }

    onDrop(files) {
        this.props.handleChange(files);
        this.setState({
            dropzoneActive: false
        });
    }

    applyMimeTypes(event) {
        this.setState({
            accept: event.target.value
        });
    }

    render() {
        const { files } = this.props;
        const { accept, dropzoneActive } = this.state;
        const overlayStyle = {
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            padding: '2.5em 0',
            background: 'rgba(0,0,0,0.5)',
            textAlign: 'center',
            color: '#fff'
        };
        const hasFiles = files && files.length > 0;
        return (
            <Dropzone
                style={{ position: 'relative', border: '3px dashed gray', borderRadius: '4px', minHeight: '80px', padding: '1rem' }}
                accept={accept}
                maxSize={2 * 1024 * 1024}
                onDrop={this.onDrop}
                onDragEnter={this.onDragEnter}
                onDragLeave={this.onDragLeave}
            >
                {dropzoneActive && <div style={overlayStyle}>Drop files...</div>}
                <h3 className="text-center"><a href="javascript:void(0);">Click here</a> or drop files</h3>
                {hasFiles && <h4>Selected files</h4>}
                {hasFiles &&
                    <ul>
                        {
                            files.map(f => <li key={f.name}>{f.name} - {Number(f.size / (1024 * 1024)).toFixed(2)} MBs</li>)
                        }
                    </ul>
                }

            </Dropzone>
        );
    }
}