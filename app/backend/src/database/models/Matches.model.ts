import { Model, INTEGER, STRING, BOOLEAN } from 'sequelize';

import db from '.';
import Teams from './Teams.model';
// import OtherModel from './OtherModel';

class Matches extends Model {
  // declare <campo>: <tipo>;
  id: number;
  homeTeam: string;
  homeTeamGoals: string;
  awayTeam: string;
  awayTeamGoals: string;
  inProgress: boolean;
}

Matches.init(
  {
    // ... Campos
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    homeTeam: {
      type: STRING,
      allowNull: false,
    },
    homeTeamGoals: {
      type: STRING,
      allowNull: false,
    },
    awayTeam: {
      type: STRING,
      allowNull: false,
    },
    awayTeamGoals: {
      type: STRING,
      allowNull: false,
    },
    inProgress: {
      type: BOOLEAN,
      allowNull: false,
    },
  },
  {
    // ... Outras configs
    sequelize: db,
    modelName: 'matches',
    underscored: true,
    timestamps: false,
  },
);

/**
 * `Workaround` para aplicar as associations em TS:
 * Associations 1:N devem ficar em uma das instâncias de modelo
 * */

// OtherModel.belongsTo(Matches, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Matches, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });
Matches.belongsTo(Teams, { foreignKey: 'homeTeam', as: 'teamHome' });
Matches.belongsTo(Teams, { foreignKey: 'awayTeam', as: 'teamAway' });

// OtherModel.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// OtherModel.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });
Teams.hasMany(Matches, { foreignKey: 'homeTeam', as: 'homeMatch' });
Teams.hasMany(Matches, { foreignKey: 'awayTeam', as: 'awayMatch' });

export default Matches;
