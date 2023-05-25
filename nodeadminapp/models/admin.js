module.exports = function (sequelize, DataTypes) {
    return sequelize.define
    (

        'admin_member', {
            admin_member_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
                comment: '관리자 계정 고유번호',
            },
            admin_id: {
                type: DataTypes.STRING(200),
                allowNull: false,
                comment: '관리자 계정 아이디',
            },
            admin_password: {
                type: DataTypes.STRING(300),
                allowNull: false,
                comment: '단방향 암호화된 관리자 계정 암호 문자열',
            },
            admin_name: {
                type: DataTypes.STRING(200),
                allowNull: false,
                comment: '관리자 명',
            },
            reg_date: {
                type: DataTypes.DATE,
                allowNull: false,
                comment: '등록일시',
            },
            reg_member_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: '등록자고유번호',
            },
            edit_date: {
                type: DataTypes.DATE,
                allowNull: true,
                comment: '수정일시',
            },
            edit_member_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                comment: '수정자고유번호',
            }
        },{
            sequelize,
            tableName: 'admin_member',
            timestamps: false,
            comment: '관리자 계정 정보',
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'admin_member_id' }],
                },
            ],
        }
    );
};