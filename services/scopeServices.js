import Scope from "../db/models/Scope.js";

export const addScope = payload => Scope.create(payload);

export const getAllScopes = ()=> Scope.findAll();

export const getScopeByDataMarker = dataMarker => Scope.findOne({
    where: {
        dataMarker,
    }
})