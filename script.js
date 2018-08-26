const store = {
  qiitaPostlist: [{}]
}

$(async () => {
  bindEvents()

  store.qiitaPostlist = await getQiitaPost()

  const postList = store.qiitaPostlist.map(post => {
    return `<li class="post-list-row" data-post-id="${post.id}">${post.title}</li>`
  })

  const $ul = $('.post-list ul')
  $ul.children('li').remove()
  $ul.append(postList)
})

function bindEvents () {
  $('.post-list').on('click', '.post-list-row', e => {
    const postId = $(e.target).attr('data-post-id')
    const selectedPost = store.qiitaPostlist.find(post => postId === post.id) || {}

    let postTitle = ''
    let renderedBody = ''
    let createdAt = ''
    let userName = ''
    let userImage = ''
    let tags = []
    if (Object.keys(selectedPost)) {
      postTitle = selectedPost.title
      renderedBody = selectedPost.rendered_body
      tags = selectedPost.tags
      userId = selectedPost.user.id
      userImageUrl = selectedPost.user.profile_image_url
      createdAt = selectedPost.created_at + 'に投稿'
    }

    const $userName = $('.user-name')
    const $userImage = $('.user-image')
    const $createdAt = $('.post-date')
    const $tags = $('.tags')
    const $postTitle = $('.post-title')
    const $postContent = $('.post-content')

    $userImage.children('img').remove()
    $userImage.append(`<img src="${userImageUrl}" width="32" height="32">`)

    $userName.text(userId)
    $createdAt.text(createdAt)

    $tags.children('span').remove()
    $tags.append(tags.map(tag => `<span class="tag">${tag.name}</span>`))

    $postTitle.text(postTitle)
    $postContent.html(renderedBody)
  })
}


function getQiitaPost(page = 1, perPage = 20) {
  return $.ajax({
    url: 'https://qiita.com/api/v2/items',
    datatype: 'JSON',
    type: 'GET',
    data: {
      page,
      per_page: perPage
    }
  })
}
