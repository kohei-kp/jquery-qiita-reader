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

    const renderedBody = selectedPost.hasOwnProperty('rendered_body')
      ? selectedPost.rendered_body
      : ''

    const $postContent = $('.post-content')
    $postContent.children().remove()
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
