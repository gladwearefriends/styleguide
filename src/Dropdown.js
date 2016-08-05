const React = require('react');
const classNames = require('classnames');

const Button = require('./Button');
const Icon = require('./Icon');

const ButtonDropdown = React.createClass({
    propTypes: {
        className:  React.PropTypes.string,
        children: React.PropTypes.node,
        up:    React.PropTypes.bool,
        width: React.PropTypes.string
    },

    getInitialState: function() {
        return {
            open: false
        };
    },

    /**
     * Toggle the dopdown
     * @param  {Event} e?
     */
    toggle: function(e) {
        if (e) {
            e.stopPropagation();
        }

        this.setState({
            open: !this.state.open
        });
    },

    /**
     * Close the dropdown
     */
    close: function() {
        this.setState({
            open: false
        });
    },

    /**
     * Bind a random click in the window to close the dropdown
     */
    bindWindowClick: function() {
        if (this.state.open) {
            window.addEventListener('click', this.close);
        } else {
            window.removeEventListener('click', this.close);
        }
    },

    componentDidUpdate: function() {
        this.bindWindowClick();
    },

    componentDidMount: function() {
        this.bindWindowClick();
    },

    componentWillUnmount: function() {
        window.removeEventListener('click', this.close);
    },

    render: function() {
        let that = this;
        let inner = [];
        let items = [];

        let { className, children, up, width, ...otherProps } = this.props;
        let { open } = this.state;

        className = classNames('dropdown', className, {
            'dropup': up
        });

        inner = React.Children.map(children, function(child) {
            // If the Button is connected through Redux.connect, it is
            // renamed to "Connect(Button...)"
            if (child && child.type && child.type.displayName.indexOf('Button') !== -1) {
                if (!child.props.onClick && !child.props.href) {
                    return React.cloneElement(child, {
                        onNativeClick: that.toggle,
                        dropdownToggle: true
                    });
                }
                return child;
            }

            return null;
        });

        items = React.Children.map(children, function(child) {
            if (child && child.type && child.type.displayName == 'DropdownItem') {
                return React.cloneElement(child, {
                    onClick: function() {
                        if (child.props.onClick) child.props.onClick();
                        that.close();
                    }
                });
            }
            return null;
        });

        return <Button.Group {...otherProps} className={className}>
            {inner}
            <DropdownMenu open={open} width={width} >{items}</DropdownMenu>
        </Button.Group>;
    }
});

const DropdownItem = React.createClass({
    propTypes: {
        children:  React.PropTypes.node,
        onClick:   React.PropTypes.func,
        href:      React.PropTypes.string,
        disabled:  React.PropTypes.bool,
        divider:   React.PropTypes.bool,
        header:    React.PropTypes.bool,
        checked:   React.PropTypes.bool
    },

    onClick: function(e) {
        if (!this.props.href) {
            e.preventDefault();
            e.stopPropagation();

            if (this.props.onClick) this.props.onClick();
        }
    },

    isInner: function(child) {
        return (!child  || !child.type || child.type.displayName !== 'DropdownMenu');
    },

    render: function() {
        var { divider, header, checked } = this.props;

        if (divider) {
            return <li className="divider"></li>;
        }
        if (header) {
            return <li className="dropdown-header">{this.props.children}</li>;
        }

        var inner = [], outer = [];

        inner = React.Children.map(this.props.children, function(child) {
            if (this.isInner(child)) return child;
            return null;
        }, this);

        outer = React.Children.map(this.props.children, function(child) {
            if (!this.isInner(child)) return child;
            return null;
        }, this);

        return <li className={this.props.disabled? 'disabled' : ''}>
            <a {...this.props} href={this.props.href || '#'} onClick={this.props.disabled? null : this.onClick}>
                {checked? <div className="dropdown-icon pull-left"><Icon id="check" /></div> : ''}
                {inner}
            </a>
            {outer}
        </li>;
    }
});

const DropdownMenu = React.createClass({
    propTypes: {
        className:  React.PropTypes.string,
        children: React.PropTypes.node,
        open: React.PropTypes.bool,
        width: React.PropTypes.string
    },

    render: function() {
        var { width } = this.props;
        var className = classNames('dropdown-menu', width? 'dropdown-' + width : '',
            {
                open: this.props.open
            }
        );

        return <ul className={className}>
            {this.props.children}
        </ul>;
    }
});

const ItemHeader = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render: function() {
        return <div className="dropdown-itemheader">
            {this.props.children}
        </div>;
    }
});

const ItemDesc = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render: function() {
        return <div className="dropdown-itemdesc">
            {this.props.children}
        </div>;
    }
});

module.exports             = ButtonDropdown;
module.exports.Item        = DropdownItem;
module.exports.Item.Header = ItemHeader;
module.exports.Item.Desc   = ItemDesc;
module.exports.Menu        = DropdownMenu;
