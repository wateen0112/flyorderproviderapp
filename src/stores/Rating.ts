import { defineStore } from 'pinia';
import { RatingApi } from '@/api/Rating/endpoints';
import { GetRatings, GetIdRating, UpsertBranchEvaluation as BranchEvaluation } from '@/api/Rating/dto';
import { useApi, usePagination } from "@/composables/index";
export const useRatingStore = defineStore('Rating', () => {
    const { GET, POST, DELETE } = useApi()
    const { pagination } = usePagination()
    const ratings = ref<GetRatings>();
    const filterRate = ref({
        endDate: '',
        startDate: ''
    });
    const ratingDetailDto = ref<GetIdRating>(new GetIdRating());
    const ratingDto = ref<BranchEvaluation>(new BranchEvaluation());


    // Get Rating
    async function GetAllRatings() {
        try {
            const res = await GET<GetRatings>(RatingApi.GetAll, {
                ...filterRate.value,
                ...pagination.value
            });
            console.log(res.data);
            ratings.value = res.data
            pagination.value.totalCount = res.data.count;
        } catch (error) {
            console.log(error);

        }
    }

    // Get by id Rating
    async function GetByIdRating(id: any) {
        try {
            const res = await GET<GetIdRating>(RatingApi.GetById, { id });
            ratingDetailDto.value = { ...res.data }

        } catch (error) {
            console.log(error);
        }
    }

    // upsert Rating
    async function UpsertBranchEvaluation(payload: any) {
        try {
            const res = await POST(RatingApi.UpsertBranchEvaluation, payload, { success: `تم حفظ التقييم الفرع` }, { formData: true });
            GetByIdRating(payload.id)
        } catch (error) {
            console.log(error);
        }
    }

    // upsert Rating
    async function UpsertDriverEvaluation(payload: any) {
        try {
            const res = await POST(RatingApi.UpsertDriverEvaluation, payload, { success: `تم حفظ التقييم السائق` }, { formData: true });
            GetByIdRating(payload.id)

        } catch (error) {
            console.log(error);
        }
    }


    // Delete driver
    async function DeleteDriver(id: any) {
        try {
            await DELETE(RatingApi.DeleteDriver, null, { orderId: id });
            GetByIdRating(id)
        } catch (error) {
            console.log(error);
        }
    }

    // Delete branch
    async function DeleteBranch(id: any, branchId: string[]) {
        try {
            await DELETE(RatingApi.DeleteBranch, {
                orderId: id, branchIds: branchId
            })
            GetByIdRating(id)

        } catch (error) {
            console.log(error);
        }

    }
    return {
        GetAllRatings, ratings, pagination, DeleteBranch, DeleteDriver, UpsertBranchEvaluation, UpsertDriverEvaluation, ratingDetailDto, ratingDto, GetByIdRating, filterRate
    }
})