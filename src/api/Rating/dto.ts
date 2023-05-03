export class Customers {

    id = "";
    number = 0;
    customerName = "";
    customerPhoneNumber = "";
    driverName = "";
    driverPhoneNumber = "";
    branchs: string[] = [];
    isEvaluated = false;
}
export class GetRatings {

    count = 0;
    customers: Customers[] = []
}

export class UpsertBranchEvaluation {
    id = null;
    note = '';
    value = 0;
    imageUrl = "";
    imageFile = null;
    branchId = "";

}


export class GetIdRating {
    id = "";
    number = 0;
    orderType = "";
    customerName = "";
    customerPhoneNumber = "";
    driversEvaluation = {
        driverId: '',
        name: '',
        phoneNumber: '',
        note: '',
        imageUrl: '',
        imageFile: null,
        value: 0,
    };
    branchesEvaluated: BranchsEvaluation[] = [];
}

export class BranchsEvaluation {
    branchId = "";
    name = "";
    category = "";
    value = 0;
    imageUrl = "";
    note = "";
}

