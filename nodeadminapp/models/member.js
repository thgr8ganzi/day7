module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'member',
        {
            member_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
                comment: '회원고유번호',
            },
            email: {
                type: DataTypes.STRING(100),
                primaryKey: false,
                allowNull: false,
                comment: '사용자메일주소',
            },
        },
        {
            timestamps: true,
            paranoid: true
        });
};