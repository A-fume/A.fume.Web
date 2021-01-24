import React from 'react';

class Thumb extends React.Component {
    state = {
        thumb: undefined,
    };

    componentWillReceiveProps(nextProps) {
        if (!nextProps.file) {
            return;
        }

        this.setState({}, () => {
            let reader = new FileReader();

            reader.onloadend = () => {
                this.setState({ thumb: reader.result });
            };

            reader.readAsDataURL(nextProps.file);
        });
    }

    render() {
        const { file } = this.props;
        const { thumb } = this.state;

        if (!file) {
            return null;
        }

        return <img src={thumb} alt={file.name} className="perfume-image" />;
    }
}

export default Thumb;
