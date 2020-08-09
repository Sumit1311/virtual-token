import AddAccountDTO from "../../dto/AddAccountDTO";
import AddCustomerDTO from "../../dto/AddCustomerDTO";
import constants from "../../constants";
import { IAccount } from "../models/account";
import QueueModel, { IQueue } from "../models/queue";
import { getGuid, getChannelType } from "../../helpers";
import CallCustomerDTO from "../../dto/CallCustomerDTO";
import GetCustomersDTO from "../../dto/GetCustomersDTO";
import { FromTo } from "moment";
import UpdateCustomerDTO from "../../dto/UpdateCustomerDTO";

export default function toQueueSchema(data: AddCustomerDTO | CallCustomerDTO | GetCustomersDTO | UpdateCustomerDTO) {
    if (data instanceof AddCustomerDTO) {
        return addCustomerDTOToQueueSchema(data);
    } else if (data instanceof CallCustomerDTO) {
        return callCustomerDTOToQueueSchema(data);
    } else if (data instanceof GetCustomersDTO) {
        return getCustomersDTOToQueueSchema(<GetCustomersDTO>data);
    } else if(data instanceof UpdateCustomerDTO) {
        return removeCustomerDTOToQueueSchema(data);   
    }
     else {
        throw new Error(constants.INVALID_DTO);
    }
}

function addCustomerDTOToQueueSchema(data: AddCustomerDTO) {
    let queue: IQueue = new QueueModel();
    queue.queueId = getGuid();
    queue.mobileNo = data.mobileNo;
    queue.channel = getChannelType(data.channel);
    queue.active = true;
    queue.allotedSlot = <FromTo>{};
    return queue;
}

function callCustomerDTOToQueueSchema(data: CallCustomerDTO) {
    let queue: IQueue = new QueueModel();
    queue.accountId = data.accountId;
    return queue;
}

function getCustomersDTOToQueueSchema(data: GetCustomersDTO) {
    let queue = new QueueModel();
    queue.accountId = data.accountId;
    return queue;
}

function removeCustomerDTOToQueueSchema(data:UpdateCustomerDTO) {
    let queue = new QueueModel();
    queue.accountId = data.accountId;
    queue.queueId = data.queueId;
    queue.active = data.active;
    return queue;
}