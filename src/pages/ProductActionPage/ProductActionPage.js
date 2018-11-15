import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { actAddProductRequest, actGetProductRequest, actUpdateProductRequest } from './../../actions/index';
import { connect } from 'react-redux';

class ProductActionPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id : '',
            txtName : '',
            txtPrice : '',
            txtDescription : '',
            chkbStatus : ''
        }
    }

    componentDidMount() {
        var { match } = this.props;
        if (match) {
            var id = match.params.id;
            this.props.onEditProduct(id);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.itemEditing) {
            var { itemEditing } = nextProps;
            this.setState({
                id : itemEditing.id,
                txtName : itemEditing.name,
                txtPrice : itemEditing.price,
                txtDescription :itemEditing.description,
                chkbStatus : itemEditing.status
            })
        }
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name] : value
        })
    }

    onSave = (event) => {
        event.preventDefault();
        var { txtName, txtPrice, txtDescription, chkbStatus, id } = this.state;
        var { history } = this.props;
        var product = {
            id : id,
            name : txtName,
            price : txtPrice,
            description : txtDescription,
            status : chkbStatus
        };
        if (id) {  // update : HTTP method : PUT
            this.props.onUpdateProduct(product);
            history.goBack();
        } else { // them moi
            this.props.onAddProduct(product);
            history.goBack();
        }
    }

    render() {
        var { txtName, txtPrice, txtDescription, chkbStatus } = this.state;
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">                                          
                <form onSubmit={ this.onSave }>
                    <div className="form-group">
                        <label>Tên sản phẩm :</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="txtName" 
                            value={ txtName }
                            onChange={ this.onChange }
                        />
                    </div> 
                    <div className="form-group">
                        <label>Giá sản phẩm :</label>
                        <input 
                            type="number" 
                            className="form-control" 
                            name="txtPrice" 
                            value={ txtPrice }
                            onChange={ this.onChange }
                        />
                    </div>  
                    <div className="form-group">
                        <label>Mô tả sản phẩm :</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="txtDescription" 
                            value={ txtDescription }
                            onChange={ this.onChange }
                        />
                    </div>
                    <div className="form-group">
                        <label>Trạng thái :</label>
                    </div>                     
                    <div className="checkbox">
                        <label>
                            <input 
                                type="checkbox" 
                                name="chkbStatus" 
                                value={ chkbStatus }
                                onChange={ this.onChange }
                                checked={ chkbStatus }
                            />
                            Còn hàng
                        </label>
                    </div>                                             
                    <button type="submit" className="btn btn-primary">
                        <i className="fas fa-arrow-down"></i>   Lưu lại
                    </button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to="/product-list" className="btn btn-danger">
                        <i className="fas fa-arrow-left"></i>   Trở lại
                    </Link>
                </form>             
            </div>           
        );
    }
}

const mapStateToProps = (state) => {
    return {
        itemEditing : state.itemEditing
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddProduct : (product) => {
            dispatch(actAddProductRequest(product));
        },
        onEditProduct : (id) => {
            dispatch(actGetProductRequest(id));
        },
        onUpdateProduct : (product) => {
            dispatch(actUpdateProductRequest(product));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductActionPage);
