import UI from '../../../ui/UI';
import Ajax from '../../../utils/Ajax';

/**
 * 类别编辑窗口
 * @author tengge / https://github.com/tengge1
 * @param {*} options 
 */
function CategoryEditWindow(options = {}) {
    UI.Control.call(this, options);

    this.ID = ''; // ObjectId格式
    this.Name = '';
    this.SaveUrl = '';
}

CategoryEditWindow.prototype = Object.create(UI.Control.prototype);
CategoryEditWindow.prototype.constructor = CategoryEditWindow;

CategoryEditWindow.prototype.render = function () {
    var container = UI.create({
        xtype: 'window',
        id: 'window',
        scope: this.id,
        parent: this.parent,
        title: '类别编辑',
        width: '300px',
        height: '240px',
        shade: true,
        bodyStyle: {
            padding: 0
        },
        children: [{
            xtype: 'row',
            children: [{
                xtype: 'label',
                text: '名称'
            }, {
                xtype: 'input',
                id: 'name',
                scope: this.id
            }]
        }, {
            xtype: 'row',
            style: {
                justifyContent: 'center',
                marginTop: '8px'
            },
            children: [{
                xtype: 'button',
                text: '确定',
                style: {
                    margin: '0 8px'
                },
                onClick: this.onSave.bind(this)
            }, {
                xtype: 'button',
                text: '取消',
                style: {
                    margin: '0 8px'
                },
                onClick: this.onCancel.bind(this)
            }]
        }]
    });
    container.render();
};

CategoryEditWindow.prototype.setData = function (data) {
    this.ID = data.ID;
    this.Name = data.Name;
    this.SaveUrl = data.SaveUrl;

    var name = UI.get('name', this.id);
    name.setValue(this.Name);
};

CategoryEditWindow.prototype.show = function () {
    UI.get('window', this.id).show();
};

CategoryEditWindow.prototype.hide = function () {
    UI.get('window', this.id).hide();
};

CategoryEditWindow.prototype.onSave = function () {
    this.Name = UI.get('name', this.id).getValue();;

    var body = new FormData();
    body.append('ID', this.ID);
    body.append('Name', this.Name);

    Ajax.post(this.SaveUrl, {
        ID: this.ID,
        Name: this.Name
    }, result => {
        var json = JSON.parse(result);
        if (json.Code === 200) {
            this.hide();
        }
        UI.msg(json.Msg);
    });
};

CategoryEditWindow.prototype.onCancel = function () {
    this.hide();
};

export default CategoryEditWindow;