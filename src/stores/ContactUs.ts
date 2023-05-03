
import { useApi, usePagination, } from "@/composables";
import {ContactApi}from '@/api/ContactUs/endpoint';
import { ContactDto, ReplyDto,AddContactDto, GetContactByIdDto } from "@/api/ContactUs/dto";
const {GET,POST,DELETE} = useApi();
export const useContactStore = defineStore('contact',()=>{

//States . . . 
  const contactsDto = ref <ContactDto[]>([]);
const contactDto = ref <GetContactByIdDto>(new GetContactByIdDto());

const startDate = ref('');
const endDate = ref('');
const query = ref<string>('');

const cahsedContactsDto  = ref <ContactDto[]>([]);
const searchRef= ref();
const paginateContacts = computed(<Advert>() => {
  return paginate(contactsDto.value);
});
//paginations
const { pagination, paginate } = usePagination()
const PagCount = computed(() => {
  return pagination.value.totalCount = ((contactsDto.value.length % 8) > 0) ? Math.floor((contactsDto.value.length / 8) )+ 1 :Math.floor( (contactsDto.value.length / 8));
},
)



//watch functions
watch(startDate, () => {
  if (startDate.value !== '' && endDate.value !== '')
 getAllContacts()
});

watch(endDate, () => {
  if (startDate.value !== '' && endDate.value !== '')
  getAllContacts()
})

watch(query, () => {

 
  getAllContacts()
})

//reset filters . . . 
const filterReset = () => {

  contactsDto.value = cahsedContactsDto.value;
  startDate.value = "";
  endDate.value ="";
  query.value ='0'

}

//Get  All Adverts
const getAllContacts  = async ()=>{
try {
  const res =await GET<ContactDto[]>(ContactApi.GetAll ,{startDate:startDate.value , endDate:endDate.value , search:query.value==='0'?'':query.value ,pageSize:10,pageIndex:1},{error:true});
  contactsDto.value = res.data;
  contactsDto.value = res.data;
} catch (error) {
  throw(error);
}
} 
//Get Advert By id 
const getyId  = async(id:string) =>{
  try {
    const res = await GET<GetContactByIdDto>(ContactApi.GetById+`?id=${id}`,{error:true});
    contactDto.value=res.data;
    contactDto.value.dateCreated=  contactDto.value.dateCreated.split('T')[0]; 
  } catch (error) {
    throw(error);
  }
}
//Add new Advert 
const addContact  = async (dto:AddContactDto)=>{
  try {
    const res = await POST(ContactApi.Add, {...dto},{success:"تم إضافة الشكوى بنجاح",error:true},{formData:true});
    contactsDto.value.push(res?.data);
  } catch (error) {
    
  }
}
//Replay on Advert 
const replyOnContact = async (reply :ReplyDto)=>{
  try {
    const res = await POST(ContactApi.Reply, reply,{success:"تم الرد على  الشكوى بنجاح",error:true});
    getyId(reply.id)
  } catch (error) {
    
  }
}


return {pagination,PagCount,paginateContacts,filterReset, searchRef,query,endDate,startDate,contactsDto,contactDto,getAllContacts,addContact ,getyId,replyOnContact}; 
});
