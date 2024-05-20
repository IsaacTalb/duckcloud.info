@extends('admin.admin_master')

@section('admin')

<div class="py-12">
    <div class="container">
        <h4 style="text-align:center; color:white; margin-bottom:2em;">Admin Message</h4>
        <div class="row">
            <br><br>

            <div class="col-md-12">
                <div class="card">
                    @if(session('success'))
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        <strong>{{ session('success') }}</strong>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    @endif

                    <div class="card-header">All Message Data</div>

                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col" width="5%">SL</th>
                                <th scope="col" width="15%">Name</th>
                                <th scope="col" width="25%">Email</th>
                                <th scope="col" width="15%">Subject</th>
                                <th scope="col" width="15%">Message</th>
                                <th scope="col" width="25%">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            @php($i = 1)
                            @foreach($messages as $mess)
                            <tr>
                                <th scope="row">{{ $i++ }}</th>
                                <td>{{ $mess->name }}</td>
                                <td>{{ $mess->email }}</td>
                                <td>{{ $mess->subject }}</td>
                                <td>{{ $mess->message }}</td>
                                <td>
                                    <!-- Reply Button -->
                                    <button class="btn btn-primary mt-2" data-toggle="modal" data-target="#replyModal-{{ $mess->id }}">Reply</button>
                                    <a href="{{ url('message/delete/'.$mess->id) }}" onclick="return confirm('Are you sure to delete')" class="btn btn-danger mt-2">Delete</a>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="6">
                                    <div class="mt-3">
                                        <strong>Replies:</strong>
                                        <ul class="list-group">
                                            @foreach($mess->replies as $reply)
                                            <li class="list-group-item">
                                                {!! $reply->message !!}
                                                <br><small>Sent at: {{ $reply->created_at }}</small>
                                            </li>
                                            @endforeach
                                        </ul>
                                    </div>
                                </td>
                            </tr>

                            <!-- Reply Modal -->
                            <div class="modal fade" id="replyModal-{{ $mess->id }}" tabindex="-1" role="dialog" aria-labelledby="replyModalLabel-{{ $mess->id }}" aria-hidden="true">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="replyModalLabel-{{ $mess->id }}">Reply to {{ $mess->name }}</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <form action="{{ route('admin.message.reply', $mess->id) }}" method="POST">
                                                @csrf
                                                <textarea name="reply" id="reply-textarea-{{ $mess->id }}" class="form-control" rows="5" placeholder="Type your reply here..."></textarea>
                                                <button type="submit" class="btn btn-primary mt-2">Send Reply</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        @foreach($messages as $mess)
            $('#replyModal-{{ $mess->id }}').on('shown.bs.modal', function () {
                if (!ClassicEditor.instances['reply-textarea-{{ $mess->id }}']) {
                    ClassicEditor
                        .create(document.querySelector('#reply-textarea-{{ $mess->id }}'), {
                            toolbar: [
                                'heading', '|',
                                'bold', 'italic', 'underline', '|',
                                'link', '|',
                                'fontColor', 'fontBackgroundColor', '|',
                                'bulletedList', 'numberedList', '|',
                                'blockQuote'
                            ],
                            heading: {
                                options: [
                                    { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                                    { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                                    { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                                    { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' }
                                ]
                            }
                        })
                        .catch(error => {
                            console.error(error);
                        });
                }
            });
        @endforeach
    });
</script>

@endsection
