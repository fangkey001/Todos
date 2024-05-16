type Posts = {
    profile_id: number;
    profile_name: string;
    profile_tag: string;
    profile_image: string;
    post_id: number;
    post_detail: string;
    count_like: number;
    count_comment: number;
    comment: {
        profile_id: number;
        profile_name: string;
        profile_image: string;
        comment: string;
    }[]
}[]